import { useState, useEffect, useCallback } from "react";
import { CNAEHeader, type ConnectionStatus } from "@/components/CNAEHeader";
import { CNAEFilters } from "@/components/CNAEFilters";
import { CNAETableDesktop } from "@/components/CNAETableDesktop";
import { CNAECardsMobile } from "@/components/CNAECardsMobile";
import { CNAEPagination } from "@/components/CNAEPagination";
import { RiskLegend } from "@/components/RiskLegend";
import { LoadingSkeletonDesktop, LoadingSkeletonMobile } from "@/components/LoadingSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import {
  fetchCNAEActivities,
  groupCNAEByCode,
  RiskLevel,
  type CNAEActivity,
} from "@/lib/supabase";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "Todos">("Todos");
  const [sortBy, setSortBy] = useState<"codigo" | "descricao">("codigo");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<CNAEActivity[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("checking");
  const [showVariationsOnly, setShowVariationsOnly] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);
  const pageSize = 50;

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setConnectionStatus((previous) => (previous === "connected" ? previous : "checking"));

      const { data, count } = await fetchCNAEActivities(
        debouncedSearch,
        riskFilter,
        sortBy,
        currentPage,
        pageSize,
        showVariationsOnly
      );

      setActivities(data);
      setTotalCount(count ?? data.length);
      setConnectionStatus("connected");
    } catch (err) {
      console.error("Erro ao carregar atividades:", err);
      setError("Não foi possível carregar as atividades. Verifique sua conexão.");
      setConnectionStatus("error");
      toast.error("Erro ao carregar dados", {
        description: "Não foi possível conectar ao banco de dados.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    currentPage,
    debouncedSearch,
    pageSize,
    riskFilter,
    sortBy,
    showVariationsOnly,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, riskFilter, sortBy, showVariationsOnly]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const groupedData = groupCNAEByCode(activities);
  const variationGroups = groupedData.filter((group) => group.variations.length > 1);
  const groupsForDisplay = showVariationsOnly ? variationGroups : groupedData;

  const effectiveTotalItems = showVariationsOnly ? variationGroups.length : totalCount;
  const totalPages = effectiveTotalItems > 0 ? Math.ceil(effectiveTotalItems / pageSize) : 0;

  const paginatedGroups = showVariationsOnly
    ? groupsForDisplay.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : groupsForDisplay;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <CNAEHeader connectionStatus={connectionStatus} />

        <main>
          <RiskLegend />

          <CNAEFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            riskFilter={riskFilter}
            onRiskFilterChange={setRiskFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            showVariationsOnly={showVariationsOnly}
            onShowVariationsOnlyChange={setShowVariationsOnly}
          />

          {showVariationsOnly && !isLoading && !error && (
            <p className="text-sm text-muted-foreground mb-4">
              Exibindo {paginatedGroups.length} códigos CNAE com variações de um total de {" "}
              {variationGroups.length}.
            </p>
          )}

          {isLoading && (
            <>
              <LoadingSkeletonDesktop />
              <LoadingSkeletonMobile />
            </>
          )}

          {!isLoading && error && <ErrorState message={error} onRetry={loadData} />}

          {!isLoading && !error && groupsForDisplay.length === 0 && (
            <EmptyState message="Nenhuma atividade encontrada com os filtros aplicados. Tente ajustar os critérios de busca." />
          )}

          {!isLoading && !error && paginatedGroups.length > 0 && (
            <>
              <CNAETableDesktop groups={paginatedGroups} />
              <CNAECardsMobile groups={paginatedGroups} />

              <CNAEPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={effectiveTotalItems}
                pageSize={pageSize}
                itemLabel={showVariationsOnly ? "códigos CNAE" : "atividades"}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
