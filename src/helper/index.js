export const certifyCarDoesNotHaveEmptyFields = car => {
    const fields = [
        { name: 'title', title: 'título' },
        { name: 'brand', title: 'marca' },
        { name: 'price', title: 'preço' },
        { name: 'age', title: 'ano' }
    ]
    fields.forEach(({ name, title }) => {
        if (!car[name]) {
            const message = `O campo ${title} deve estar preencido!`;
            alert(message);
            throw message;
        }
    })
}