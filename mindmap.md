```ts
type QuestionID = string;

interface Question {
    id: QuestionID;
    content: string;
    answers?: Answer[];
    info?: string;
}

interface Answer {
    content: string;
    destination?: QuestionID;
    subanswers?: SubAnswer[];
    info?: string;
}

interface SubAnswer {
    content: string;
    destination?: QuestionID;
    info?: string;
}
```
```json
[
    {
        "id": "je-suis",
        "content": "Je suis",
        "answers": [
            {
                "content": "Un parent",
                "subanswers": [
                    {
                        "content": "Mon enfant a moins de 6 ans",
                        "destination": "rdv-creche-med-pmi"
                    }
                ],
                "info": "Info bull niveau réponse"
            },
            {
                "content": "Un proche ou un aidant",
                "destination": "vs-real-pour-le-compte-de"
            }
        ],
        "info": "Info bull niveau question"
    },
    {
        "id": "rdv-creche-med-pmi",
        "content": "Prenez rendez-vous avec le pédiatre, le médecin de la crèche ou de la PMI"
    }
]
```
