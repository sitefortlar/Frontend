import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, Building2, Loader2, RefreshCw, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AdminRoute } from '@/components/AdminRoute';
import { companyService, type Company, type Contact } from '@/services/company';
import { useToast } from '@/hooks/use-toast';

const PAGE_SIZE = 20;

function formatCnpj(cnpj: string) {
  const digits = cnpj.replace(/\D/g, '');
  if (digits.length !== 14) return cnpj || '—';
  return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

function getPrimaryContact(company: Company): Contact | undefined {
  return company.contatos?.[0];
}

export default function EmpresasAdminPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchName, setSearchName] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active'>('all');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await companyService.listCompaniesWithContacts({
        skip: page * PAGE_SIZE,
        limit: PAGE_SIZE,
        active_only: activeFilter === 'active' ? true : undefined,
        search_name: submittedSearch.trim() || undefined,
      });
      setCompanies(data);
    } catch (error: any) {
      setCompanies([]);
      toast({
        title: 'Erro ao carregar empresas',
        description: error.message ?? 'Não foi possível carregar as empresas cadastradas.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [activeFilter, page, submittedSearch, toast]);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  const handleSearch = () => {
    setPage(0);
    setSubmittedSearch(searchName);
  };

  const handleFilterChange = (value: 'all' | 'active') => {
    setPage(0);
    setActiveFilter(value);
  };

  const hasNextPage = companies.length === PAGE_SIZE;

  return (
    <AdminRoute>
      <main className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Voltar">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-bold">
                <Building2 className="h-7 w-7" />
                Gerenciamento de empresas
              </h1>
              <p className="text-sm text-muted-foreground">Empresas cadastradas e seus contatos principais</p>
            </div>
          </div>
          <Button variant="outline" onClick={loadCompanies} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Empresas</CardTitle>
            <CardDescription>Consulte empresas por razão social ou nome fantasia.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 gap-2">
                <Input
                  value={searchName}
                  onChange={(event) => setSearchName(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
                  placeholder="Buscar por razão social ou nome fantasia"
                />
                <Button onClick={handleSearch} disabled={loading}>
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
              </div>
              <Select value={activeFilter} onValueChange={handleFilterChange}>
                <SelectTrigger className="sm:w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as empresas</SelectItem>
                  <SelectItem value="active">Somente ativas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead className="hidden md:table-cell">Telefone</TableHead>
                  <TableHead className="hidden lg:table-cell">E-mail</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={6} className="h-40 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin" /></TableCell></TableRow>
                ) : companies.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="h-40 text-center text-muted-foreground">Nenhuma empresa encontrada.</TableCell></TableRow>
                ) : companies.map((company) => {
                  const contact = getPrimaryContact(company);
                  return (
                    <TableRow key={company.id_empresa}>
                      <TableCell><div className="font-medium">{company.nome_fantasia || company.razao_social}</div><div className="text-xs text-muted-foreground">{company.razao_social}</div></TableCell>
                      <TableCell>{formatCnpj(company.cnpj)}</TableCell>
                      <TableCell>{contact?.nome || '—'}</TableCell>
                      <TableCell className="hidden md:table-cell">{contact?.celular || contact?.telefone || '—'}</TableCell>
                      <TableCell className="hidden lg:table-cell">{contact?.email || '—'}</TableCell>
                      <TableCell><Badge variant={company.ativo ? 'default' : 'secondary'}>{company.ativo ? 'Ativa' : 'Inativa'}</Badge></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-muted-foreground">Página {page + 1}</span>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setPage((current) => current - 1)} disabled={loading || page === 0}>Anterior</Button>
                <Button variant="outline" onClick={() => setPage((current) => current + 1)} disabled={loading || !hasNextPage}>Próxima</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </AdminRoute>
  );
}
