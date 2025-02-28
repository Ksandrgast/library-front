export interface CountriesInterface {
    code: string;
    label: string;
    phone: string;
    suggested: boolean;
}

export const countries: readonly CountriesInterface[] = [
    {code: 'AE', label: 'United Arab Emirates', phone: '971', suggested: true},
    {code: 'KZ', label: 'Kazakhstan', phone: '7', suggested: true},
]
