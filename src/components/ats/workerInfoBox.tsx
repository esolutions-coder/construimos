type WorkerInfoBox = {
  name: string;
  url: string;
};

export default function WorkerInfoBox({ name, url }: WorkerInfoBox) {
  return (
    <div className="workerInfoBox">
      <div className="name">
        <a href={url}>{name}</a>
      </div>
      <div className="options">
        <a href={url} target="_blank">
          <div className="flexCentered">
            <span className="material-symbols-outlined">visibility</span>
          </div>
        </a>
      </div>
    </div>
  );
}
