import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Demo from "./pages/Demo.tsx";
import Listening from "./pages/Listening.tsx";
import Confirming from "./pages/Confirming.tsx";
import Processing from "./pages/Processing.tsx";
import Success from "./pages/Success.tsx";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/listening" element={<Listening />} />
        <Route path="/confirming" element={<Confirming />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
