import { supabase } from "@/integrations/supabase/client";

export type RiskLevel = "Baixo" | "Médio" | "Alto";

export interface CNAEActivity {
  id: string;
  codigo_cnae: string;
  descricao_atividade: string;
  nivel_risco: RiskLevel;
  created_at?: string;
}

export interface GroupedCNAE {
  codigo: string;
  variations: {
    id: string;
    descricao: string;
    nivel_risco: RiskLevel;
  }[];
}

export async function fetchCNAEActivities(
  searchTerm?: string,
  riskFilter?: RiskLevel | "Todos",
  sortBy: "codigo" | "descricao" = "codigo",
  page: number = 1,
  pageSize: number = 50
) {
  let query = supabase
    .from("csf_cnae")
    .select("*", { count: "exact" });

  // Filtro de busca
  if (searchTerm && searchTerm.trim()) {
    query = query.or(`codigo_cnae.ilike.%${searchTerm}%,descricao_atividade.ilike.%${searchTerm}%`);
  }

  // Filtro de risco
  if (riskFilter && riskFilter !== "Todos") {
    query = query.eq("nivel_risco", riskFilter);
  }

  // Ordenação
  query = query.order(sortBy === "codigo" ? "codigo_cnae" : "descricao_atividade", { ascending: true });

  // Paginação
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw error;

  return { data: data || [], count: count || 0 };
}

export function groupCNAEByCode(activities: CNAEActivity[]): GroupedCNAE[] {
  const grouped = new Map<string, GroupedCNAE>();

  activities.forEach((activity) => {
    if (!grouped.has(activity.codigo_cnae)) {
      grouped.set(activity.codigo_cnae, {
        codigo: activity.codigo_cnae,
        variations: [],
      });
    }

    grouped.get(activity.codigo_cnae)!.variations.push({
      id: activity.id,
      descricao: activity.descricao_atividade,
      nivel_risco: activity.nivel_risco,
    });
  });

  return Array.from(grouped.values());
}
