function csvToJson(file: File) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(csvParser(reader.result))
        reader.readAsText(file)
    })
};


function csvParser(data: any) {
    const text = data.split(/\r\n|\n/);
    const [first, ...lines] = text;
    const headers = first.split(";");
    const rows: any = [];
    lines.map((line: any) => {
        const values = line.split(";");
        const row = Object.fromEntries(
            headers.map((header: any, i: string | number) => [header, values[i]])
        );
        rows.push(row);
    });

    return rows
};

export default csvToJson;