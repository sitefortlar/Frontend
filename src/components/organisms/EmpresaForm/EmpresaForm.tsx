/**
 * EmpresaForm Component - Atomic Design
 * Organismo para formulário de cadastro de empresa
 */

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { companyRegistrationSchema } from '../../../schemas'
import { Button } from '../../atoms/Button'
import { Input } from '../../atoms/Input'
import { FormField } from '../../molecules/FormField'
import { CNPJInput } from '../../molecules/CNPJInput'
import { PhoneInput } from '../../molecules/PhoneInput'
import { CEPInput } from '../../molecules/CEPInput'
import { CnpjService } from '../../../services/cnpjService'
import { CepService } from '../../../services/cepService'
import {
  FormContainer,
  FormTitle,
  FormDescription,
  FormGrid,
  FormSection,
  SectionTitle,
  FormActions,
  SubmitButton,
  LoadingOverlay,
  LoadingSpinner,
  ErrorMessage,
  SuccessMessage,
} from './EmpresaForm.styles'

interface EmpresaFormData {
  cnpj: string
  razaoSocial: string
  nomeFantasia: string
  email: string
  telefone: string
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  uf: string
}

export const EmpresaForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const form = useForm<EmpresaFormData>({
    resolver: zodResolver(companyRegistrationSchema),
    defaultValues: {
      cnpj: '',
      razaoSocial: '',
      nomeFantasia: '',
      email: '',
      telefone: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
    },
  })

  const cnpjService = new CnpjService()
  const cepService = new CepService()

  const handleCNPJSearch = async () => {
    const cnpj = form.getValues('cnpj')
    if (!cnpj) return

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const data = await cnpjService.searchByCnpj(cnpj)
      
      // Preenche os campos automaticamente
      form.setValue('razaoSocial', data.razao_social)
      form.setValue('nomeFantasia', data.fantasia)
      form.setValue('logradouro', data.logradouro)
      form.setValue('numero', data.numero)
      form.setValue('complemento', data.complemento || '')
      form.setValue('bairro', data.bairro)
      form.setValue('cidade', data.municipio)
      form.setValue('uf', data.uf)
      form.setValue('cep', data.cep)
      
      setSuccess('Dados da empresa carregados com sucesso!')
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar dados da empresa')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCEPSearch = async () => {
    const cep = form.getValues('cep')
    if (!cep) return

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const data = await cepService.searchByCep(cep)
      
      // Preenche os campos de endereço
      form.setValue('logradouro', data.logradouro)
      form.setValue('bairro', data.bairro)
      form.setValue('cidade', data.cidade)
      form.setValue('uf', data.uf)
      
      setSuccess('Endereço carregado com sucesso!')
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar endereço')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: EmpresaFormData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Simula envio para API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Form data:', data)
      setSuccess('Empresa cadastrada com sucesso!')
      form.reset()
    } catch (err: any) {
      setError(err.message || 'Erro ao cadastrar empresa')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormContainer>
      <FormTitle>Cadastro de Empresa</FormTitle>
      <FormDescription>
        Preencha os dados da sua empresa para criar sua conta
      </FormDescription>
      
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {error && (
          <ErrorMessage>
            <AlertCircle />
            {error}
          </ErrorMessage>
        )}
        
        {success && (
          <SuccessMessage>
            <CheckCircle />
            {success}
          </SuccessMessage>
        )}
        
        <FormGrid>
          <FormSection>
            <SectionTitle>Dados da Empresa</SectionTitle>
            
            <FormField
              label="CNPJ"
              required
              error={form.formState.errors.cnpj?.message}
            >
              <CNPJInput
                value={form.watch('cnpj')}
                onChange={(value) => form.setValue('cnpj', value)}
                onSearch={handleCNPJSearch}
                showSearchButton
                isLoading={isLoading}
              />
            </FormField>
            
            <FormField
              label="Razão Social"
              required
              error={form.formState.errors.razaoSocial?.message}
            >
              <Input
                {...form.register('razaoSocial')}
                placeholder="Razão Social"
              />
            </FormField>
            
            <FormField
              label="Nome Fantasia"
              error={form.formState.errors.nomeFantasia?.message}
            >
              <Input
                {...form.register('nomeFantasia')}
                placeholder="Nome Fantasia"
              />
            </FormField>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Contato</SectionTitle>
            
            <FormField
              label="E-mail"
              required
              error={form.formState.errors.email?.message}
            >
              <Input
                {...form.register('email')}
                type="email"
                placeholder="E-mail"
              />
            </FormField>
            
            <FormField
              label="Telefone"
              required
              error={form.formState.errors.telefone?.message}
            >
              <PhoneInput
                value={form.watch('telefone')}
                onChange={(value) => form.setValue('telefone', value)}
              />
            </FormField>
          </FormSection>
        </FormGrid>
        
        <FormSection>
          <SectionTitle>Endereço</SectionTitle>
          
          <FormField
            label="CEP"
            required
            error={form.formState.errors.cep?.message}
          >
            <CEPInput
              value={form.watch('cep')}
              onChange={(value) => form.setValue('cep', value)}
              onSearch={handleCEPSearch}
              showSearchButton
              isLoading={isLoading}
            />
          </FormField>
          
          <FormGrid>
            <FormField
              label="Logradouro"
              required
              error={form.formState.errors.logradouro?.message}
            >
              <Input
                {...form.register('logradouro')}
                placeholder="Rua, Avenida, etc."
              />
            </FormField>
            
            <FormField
              label="Número"
              required
              error={form.formState.errors.numero?.message}
            >
              <Input
                {...form.register('numero')}
                placeholder="Número"
              />
            </FormField>
          </FormGrid>
          
          <FormField
            label="Complemento"
            error={form.formState.errors.complemento?.message}
          >
            <Input
              {...form.register('complemento')}
              placeholder="Apartamento, sala, etc."
            />
          </FormField>
          
          <FormGrid>
            <FormField
              label="Bairro"
              required
              error={form.formState.errors.bairro?.message}
            >
              <Input
                {...form.register('bairro')}
                placeholder="Bairro"
              />
            </FormField>
            
            <FormField
              label="Cidade"
              required
              error={form.formState.errors.cidade?.message}
            >
              <Input
                {...form.register('cidade')}
                placeholder="Cidade"
              />
            </FormField>
          </FormGrid>
          
          <FormField
            label="UF"
            required
            error={form.formState.errors.uf?.message}
          >
            <Input
              {...form.register('uf')}
              placeholder="Estado"
              maxLength={2}
            />
          </FormField>
        </FormSection>
        
        <FormActions>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            Limpar
          </Button>
          
          <SubmitButton
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar Empresa'}
          </SubmitButton>
        </FormActions>
      </form>
      
      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      )}
    </FormContainer>
  )
}