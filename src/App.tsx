import "react-icons/io5";
import { AuthProvider } from "./customHooks/auth/useAuth";
import { IndexRoutes } from "./routes/index_routes";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <IndexRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
