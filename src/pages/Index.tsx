import { useState, useEffect } from "react";
import { CNAEHeader } from "@/components/CNAEHeader";
import { CNAEFilters } from "@/components/CNAEFilters";
import { CNAETableDesktop } from "@/components/CNAETableDesktop";
import { CNAECardsMobile } from "@/components/CNAECardsMobile";
import { CNAEPagination } from "@/components/CNAEPagination";
import { RiskLegend } from "@/components/RiskLegend";
import { LoadingSkeletonDesktop, LoadingSkeletonMobile } from "@/components/LoadingSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { fetchCNAEActivities, groupCNAEByCode, RiskLevel } from "@/lib/supabase";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "Todos">("Todos");
  const [sortBy, setSortBy] = useState<"codigo" | "descricao">("codigo");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const debouncedSearch = useDebounce(searchTerm, 300);
  const pageSize = 50;
  const totalPages = Math.ceil(totalCount / pageSize);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, count } = await fetchCNAEActivities(
        debouncedSearch,
        riskFilter,
        sortBy,
        currentPage,
        pageSize
      );

      setActivities(data);
      setTotalCount(count);
    } catch (err) {
      console.error("Erro ao carregar atividades:", err);
      setError("Não foi possível carregar as atividades. Verifique sua conexão.");
      toast.error("Erro ao carregar dados", {
        description: "Não foi possível conectar ao banco de dados.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, riskFilter, sortBy]);

  useEffect(() => {
    loadData();
  }, [debouncedSearch, riskFilter, sortBy, currentPage]);

  const groupedData = groupCNAEByCode(activities);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <CNAEHeader />

        <main>
          <RiskLegend />

          <CNAEFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            riskFilter={riskFilter}
            onRiskFilterChange={setRiskFilter as any}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {isLoading && (
            <>
              <LoadingSkeletonDesktop />
              <LoadingSkeletonMobile />
            </>
          )}

          {!isLoading && error && <ErrorState message={error} onRetry={loadData} />}

          {!isLoading && !error && groupedData.length === 0 && (
            <EmptyState message="Nenhuma atividade encontrada com os filtros aplicados. Tente ajustar os critérios de busca." />
          )}

          {!isLoading && !error && groupedData.length > 0 && (
            <>
              <CNAETableDesktop groups={groupedData} />
              <CNAECardsMobile groups={groupedData} />

              <CNAEPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={totalCount}
                pageSize={pageSize}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
