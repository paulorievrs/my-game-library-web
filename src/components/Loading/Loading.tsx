export function Loading() {
  return (
    <div className="absolute h-screen w-full bg-primary-black bg-opacity-70 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}
