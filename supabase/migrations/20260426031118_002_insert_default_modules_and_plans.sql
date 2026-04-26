/*
  # Insert Default Modules and Plans

  1. Modules
    - CPF Completo
    - Wolf Plus Telefone
    - Placa Master
    - Wolf Telefone Max
    - CNH Wolf
    - Foto RJ
    - Wolf PIS

  2. Plans
    - Free
    - Starter
    - Professional
    - Enterprise
*/

INSERT INTO modules (name, description, api_type, status, icon_name) VALUES
  ('CPF Completo', 'A consulta de CPF retorna: nome, CPF, data de nascimento, filiação e endereço completo', 'cpf', 'online', 'cpf'),
  ('Wolf Plus Telefone', 'Módulo inteligente para consultas completas e precisas de dados telefônicos', 'phone', 'online', 'phone'),
  ('Placa Master', 'Consulta dados detalhados através deste módulo com informações precisas', 'plate', 'online', 'plate'),
  ('Wolf Telefone Max', 'Consulte dados detalhados através deste módulo com informações precisas', 'phone', 'online', 'phone'),
  ('CNH Wolf', 'O módulo retorna dados de CNH, incluindo informações pessoais e histórico de infrações', 'cnh', 'online', 'cnh'),
  ('Foto RJ', 'Módulo que busca em uma base de 6,3 milhões de CPFs com fotografias do Rio de Janeiro', 'photo', 'online', 'photo'),
  ('Wolf PIS', 'Módulo para buscar informações detalhadas de PIS/PASEP no Brasil', 'pis', 'online', 'pis')
ON CONFLICT DO NOTHING;

INSERT INTO plans (name, description, price, currency, billing_period, features, is_active) VALUES
  ('Free', 'Plano básico para começar', 0, 'BRL', 'month', '["10 consultas por mês", "1 módulo disponível", "Suporte básico"]', true),
  ('Starter', 'Plano para pequenos negócios', 29.90, 'BRL', 'month', '["100 consultas por mês", "3 módulos disponíveis", "Suporte prioritário", "Histórico de 6 meses"]', true),
  ('Professional', 'Plano para empresas em crescimento', 99.90, 'BRL', 'month', '["1000 consultas por mês", "Todos os módulos", "Suporte 24/7", "API completa", "Histórico ilimitado"]', true),
  ('Enterprise', 'Plano para grandes empresas', 299.90, 'BRL', 'month', '["Consultas ilimitadas", "Todos os módulos", "Suporte dedicado 24/7", "API com limite customizado", "Integrações customizadas", "SLA garantido"]', true)
ON CONFLICT DO NOTHING;
