import { ApolloError } from "@apollo/client";

interface QueryResultsProps {
  loading: boolean;
  error: ApolloError | undefined;
  data: any;
  children: React.ReactNode;
  searchName: string;
}

function QueryResult({
  loading,
  error,
  data,
  children,
  searchName,
}: QueryResultsProps): JSX.Element {
  if (error) {
    return <p>ERROR {error.message}</p>;
  }
  if (loading) {
    return (
      <div className="spinner_home">
        <div className="spinner-cidein">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  if (!data) {
    return <p>Aquí aparecerán tus resultados</p>;
  }
  if (data[searchName] === null || data[searchName].length === 0) {
    return (
      <div className="no_searched">
        <span className="material-symbols-outlined no_select">
          sentiment_very_dissatisfied
        </span>
        <p className="caption">No hemos encontrado lo que buscabas...</p>
      </div>
    );
  }
  if (data) {
    return <>{children}</>;
  }
  return <p>Algo sucedió</p>;
}

export default QueryResult;
