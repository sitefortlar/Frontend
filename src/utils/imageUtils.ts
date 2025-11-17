/**
 * Converte um link do Google Drive para um link direto de imagem
 * @param driveUrl - URL do Google Drive no formato https://drive.google.com/file/d/FILE_ID/view
 * @returns URL direta da imagem do Google Drive
 */
export function convertDriveUrlToImage(driveUrl: string): string {
  if (!driveUrl) return driveUrl;
  
  // Verifica se é um link do Google Drive
  if (driveUrl.includes('drive.google.com')) {
    // Extrai o FILE_ID do link
    // Formato: https://drive.google.com/file/d/FILE_ID/view
    const match = driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    
    if (match && match[1]) {
      const fileId = match[1];
      // Retorna o link direto da imagem usando uc?export=view
      // Opção 1: Tamanho original
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
      
      // Opção 2: Com thumbnail (descomente se quiser tamanho específico)
      // return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
  }
  
  // Se não for um link do Drive ou não conseguir extrair o ID, retorna o original
  return driveUrl;
}

