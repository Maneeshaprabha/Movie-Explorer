
import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { Tabs } from "@mui/material";
import { MovieProvider } from "../context/MovieProvider";
;
export function MovieExplorer() {
  return (
 <AuthProvider>
      <MovieProvider>
        <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
          <Tabs className="w-full">
            <div className="container mx-auto py-6">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                  <span className="text-primary">Movie</span> Explorer
                </h1>
                <div className="flex items-center gap-4">
                  <ThemeToggle  />
                  <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="login" disabled={isLoggedIn}>
                      Login
                    </TabsTrigger>
                    <TabsTrigger value="explore" disabled={!isLoggedIn}>
                      Explore
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="login" className="mt-0">
                <LoginForm onLogin={handleLogin} />
              </TabsContent>

              <TabsContent value="explore" className="mt-0">
                <MovieDashboard />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </MovieProvider>
    </AuthProvider>
  );
}
