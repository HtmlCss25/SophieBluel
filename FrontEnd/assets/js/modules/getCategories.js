function getCategories() {
    const db = "http://localhost:5678/api/";
    const path = ["categories"];

    return fetch(db + path)
                .then(r => {
                    if (!r.ok) {
                        throw new Error("db error : " + r.status);
                    }
                    return r.json();
                })
                .catch(error => {
                    console.error("db error : " + error);
                })
}

export default getCategories;