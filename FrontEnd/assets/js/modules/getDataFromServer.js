function getDataFromServer() {
    const db = "http://localhost:5678/api/";
    const paths = ["categories", "works"];
    let promises = [];

    for (const path of paths) {
        promises.push(
            fetch(db + path)
                .then(r => {
                    if (!r.ok) {
                        throw new Error("db error : " + r.status);
                    }
                    return r.json();
                })
                .catch(error => {
                    console.error("db error : " + error);
                })
        );
    }

    return Promise.all(promises)
        .then(data => {
            let response = {};
            paths.forEach((path, index) => {
                response[path] = data[index];
            });
            return response;
        });
}

export default getDataFromServer;