module.exports = [
    {
        id: "get-infos",
        url: "/api/sav/v1/resume",
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
                        {
                            "title": "questões por docente",
                            "value": "20.5"
                        },
                        {
                            "title": "aprovações por docente",
                            "value": "90%"
                        },
                        {
                            "title": "reprovações por docente",
                            "value": "5%"
                        },
                        {
                            "title": "avaliações por docente",
                            "value": "5.5"
                        }
                    ]
                }
            },
            {
                id: "error",
                response: {
                    status: 400,
                    body: {
                        message: "Error"
                    }
                }
            }
        ]
    }
]