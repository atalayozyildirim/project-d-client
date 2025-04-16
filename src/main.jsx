import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import AuthMiddleware from "./components/Private/AuthMiddleware.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Customer } from "./pages/Customer.jsx";
import Employers from "./pages/Employers.jsx";
import Chart from "./pages/Chart.jsx";
import InvoicePage from "./pages/Invoice.jsx";
import TaskPage from "./pages/Task.jsx";
import Inbox from "./pages/Inbox.jsx";
import Notfication from "./pages/Notfication.jsx";
import Profile from "./pages/Profile.jsx";
import { AIDetail } from "./pages/AIDetail.jsx";
import { AddNavbarContext } from "./Context/AddNavbarContext.jsx";
import { FormContext } from "./Context/FormContext.jsx";
import { ChartContextProvider } from "./Context/ChartContext.jsx";
import { ImapContext } from "./Context/ImapContext.jsx";
import InvoiceDetail from "./pages/InvoiceDetail.jsx";
import { MailContext } from "./Context/MailSend.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <FormContext>
        <AddNavbarContext>
          <ChartContextProvider>
            <ImapContext>
              <MailContext>
                <Routes>
                  <Route index path="/" element={<App />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route path="*" element={<h1>404 Not Found</h1>} />
                  <Route
                    exact
                    path="/home"
                    element={
                      <AuthMiddleware>
                        <Home />
                      </AuthMiddleware>
                    }
                  />
                  <Route
                    path="/customers"
                    element={
                      <AuthMiddleware>
                        <Customer />
                      </AuthMiddleware>
                    }
                  />
                  <Route
                    path="/employers"
                    element={
                      <AuthMiddleware>
                        <Employers />
                      </AuthMiddleware>
                    }
                  />
                  <Route
                    path="/chart"
                    element={
                      <AuthMiddleware>
                        <Chart />
                      </AuthMiddleware>
                    }
                  />
                  <Route
                    path="/invoice"
                    element={
                      <AuthMiddleware>
                        <InvoicePage />
                      </AuthMiddleware>
                    }
                  />
                  <Route
                    path="/invoice/:id"
                    element={
                      <AuthMiddleware>
                        <InvoiceDetail />
                      </AuthMiddleware>
                    }
                  />
                  <Route
                    path="/tasks"
                    element={
                      <AuthMiddleware>
                        <TaskPage />
                      </AuthMiddleware>
                    }
                  />
                  <Route
                    path="/mail"
                    element={
                      <AuthMiddleware>
                        <Inbox />
                      </AuthMiddleware>
                    }
                  />
                  <Route
                    path="/notfication"
                    element={
                      <AuthMiddleware>
                        <Notfication />
                      </AuthMiddleware>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <AuthMiddleware>
                        <Profile />
                      </AuthMiddleware>
                    }
                  />
                  <Route
                    path="/ai"
                    element={
                      <AuthMiddleware>
                        <AIDetail />
                      </AuthMiddleware>
                    }
                  />
                </Routes>
              </MailContext>
            </ImapContext>
          </ChartContextProvider>
        </AddNavbarContext>
      </FormContext>
    </QueryClientProvider>
  </BrowserRouter>
);
