module.exports = [
    {
        id: "get-movimentacoes",
        url: "/api/sav/v1/movimentacao/usuarios",
        method: "GET",
        variants: [
            {
                id: "empty",
                response: {
                    status: 200,
                    body: []
                }
            },
            {
                id: "success",
                response: {
                    status: 200,
                    body: [
                        ["hora", "usuários", "movimentações"],
                        ["0", 0, 0],
                        ["2", 0, 0],
                        ["4", 0, 0],
                        ["6", 0, 0],
                        ["8", 3, 7],
                        ["10", 8, 23],
                        ["12",3, 12],
                        ["14", 3, 5],
                        ["16", 3, 8],
                        ["18", 9, 12],
                        ["20", 9, 25],
                        ["22", 1, 2]
                    ]
                }
            }
        ]
    }
]