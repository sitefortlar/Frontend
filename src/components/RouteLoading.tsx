const RouteLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
};

export default RouteLoading;
