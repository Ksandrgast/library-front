export interface ProgrammingLanguageInterface {
    id: number,
    label: string;
    value: string;
}

export const programmingLanguages = [
    {id: 1, label: 'C', value: 'c'},
    {id: 2, label: 'C#', value: 'csharp'},
    {id: 3, label: 'C++', value: 'cpp'},
    {id: 4, label: 'Java', value: 'java'},
    {id: 5, label: 'JavaScript', value: 'javascript'},
    {id: 6, label: 'TypeScript', value: 'typescript'},
    {id: 7, label: 'Python', value: 'python'},
    {id: 8, label: 'Ruby', value: 'ruby'},
];

export const programmingLanguagesFirstLetters = programmingLanguages
    .map((option) => {
        const firstLetter = option.label[0].toUpperCase();

        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });
