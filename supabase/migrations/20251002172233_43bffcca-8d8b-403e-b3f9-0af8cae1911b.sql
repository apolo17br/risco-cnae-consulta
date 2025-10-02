-- Criar enum para nível de risco
CREATE TYPE public.risk_level AS ENUM ('Baixo', 'Médio', 'Alto');

-- Criar tabela de atividades CNAE
CREATE TABLE public.csf_cnae (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo_cnae TEXT NOT NULL,
  descricao_atividade TEXT NOT NULL,
  nivel_risco public.risk_level NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('America/Sao_Paulo'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('America/Sao_Paulo'::text, now()) NOT NULL
);

-- Criar índices para melhorar performance de busca
CREATE INDEX idx_csf_cnae_codigo ON public.csf_cnae (codigo_cnae);
CREATE INDEX idx_csf_cnae_nivel_risco ON public.csf_cnae (nivel_risco);
CREATE INDEX idx_csf_cnae_descricao ON public.csf_cnae USING gin (to_tsvector('portuguese', descricao_atividade));

-- Habilitar Row Level Security
ALTER TABLE public.csf_cnae ENABLE ROW LEVEL SECURITY;

-- Política: Todos podem visualizar (consulta pública)
CREATE POLICY "Consulta pública - leitura permitida"
  ON public.csf_cnae
  FOR SELECT
  USING (true);

-- Política: Nenhum usuário pode inserir (bloqueado)
CREATE POLICY "Inserção bloqueada - somente leitura"
  ON public.csf_cnae
  FOR INSERT
  WITH CHECK (false);

-- Política: Nenhum usuário pode atualizar (bloqueado)
CREATE POLICY "Atualização bloqueada - somente leitura"
  ON public.csf_cnae
  FOR UPDATE
  USING (false);

-- Política: Nenhum usuário pode excluir (bloqueado)
CREATE POLICY "Exclusão bloqueada - somente leitura"
  ON public.csf_cnae
  FOR DELETE
  USING (false);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('America/Sao_Paulo'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.csf_cnae
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Comentários para documentação
COMMENT ON TABLE public.csf_cnae IS 'Tabela de consulta pública de atividades econômicas classificadas por nível de risco sanitário - Vigilância em Saúde Itajaí/SC';
COMMENT ON COLUMN public.csf_cnae.codigo_cnae IS 'Código CNAE da atividade econômica (pode haver múltiplas entradas para o mesmo código)';
COMMENT ON COLUMN public.csf_cnae.descricao_atividade IS 'Descrição completa da atividade econômica';
COMMENT ON COLUMN public.csf_cnae.nivel_risco IS 'Classificação do nível de risco sanitário: Baixo, Médio ou Alto';