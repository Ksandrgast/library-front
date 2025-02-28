// Libraries
import React from "react";
import {Autocomplete, Box, CircularProgress, TextField, Typography} from "@mui/material";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

// Imports
import {sleepInput} from "./utils/sleep-utils";
import {
    ProgrammingLanguageInterface,
    programmingLanguages,
    programmingLanguagesFirstLetters
} from "./models/programming-languages";
import {countries} from "./models/countries";

const UIKitPageInputsModule: React.FC = () => {
    const inputHint = React.useRef('');

    const [inputOptions, setInputOptions] = React.useState<readonly ProgrammingLanguageInterface[]>([]);
    const [inputOpen, setInputOpen] = React.useState(false);
    const [inputLoading, setInputLoading] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');

    const handleOpenInput = () => {
        setInputOpen(true);

        (async () => {
            setInputLoading(true);
            await sleepInput(1e3);
            setInputLoading(false);

            setInputOptions([...programmingLanguages]);
        })();
    };

    const handleCloseInput = () => {
        setInputOpen(false);
        setInputOptions([]);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 10px'
            }}>
                <Autocomplete
                    options={programmingLanguages}
                    disablePortal
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="Programming Language"/>}
                />

                <Autocomplete
                    options={programmingLanguages}
                    disableCloseOnSelect
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="Disable On Select"/>}
                />

                <Autocomplete
                    options={programmingLanguages}
                    disableClearable
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="Disable Clearable"/>}
                />

                <Autocomplete
                    options={programmingLanguagesFirstLetters.sort((a, b) => -b.label.localeCompare(a.label))}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.label}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="With categories"/>}
                />
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '0 0 10px'
            }}>
                <Autocomplete
                    id="disabled"
                    options={programmingLanguages}
                    disabled
                    sx={{width: 285}}
                    renderInput={(params) => (<TextField {...params} label="Disabled"/>)}
                />

                <Autocomplete
                    id="readOnly"
                    options={programmingLanguages}
                    readOnly
                    defaultValue={programmingLanguages[3]}
                    sx={{width: 285}}
                    renderInput={(params) => (<TextField {...params} label="Read only"/>)}
                />

                <Autocomplete
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => {
                        const {key, ...optionProps} = props;
                        return (
                            <Box
                                key={key}
                                component="li"
                                sx={{'& > img': {mr: 2, flexShrink: 0}}}
                                {...optionProps}
                            >
                                <img
                                    loading="lazy"
                                    width="20"
                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                    alt="flag"
                                />
                                {option.label} ({option.code}) +{option.phone}
                            </Box>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Choose a country"
                            slotProps={{
                                htmlInput: {
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                },
                            }}
                        />
                    )}
                    sx={{width: 350}}
                />
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '0 0 10px'
            }}>
                <Autocomplete
                    options={programmingLanguages}
                    getOptionDisabled={(programmingLanguage) =>
                        programmingLanguage === programmingLanguages[0] || programmingLanguage === programmingLanguages[2]
                    }
                    disablePortal
                    renderInput={(params) => <TextField {...params} label="Programming Language"/>}
                    sx={{width: 285}}
                />

                <Autocomplete
                    options={inputOptions}
                    loading={inputLoading}
                    open={inputOpen}
                    onOpen={handleOpenInput}
                    onClose={handleCloseInput}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Loading Input"
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {inputLoading ?
                                                <CircularProgress color="inherit" size={20}/> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                },
                            }}
                        />
                    )}
                    sx={{width: 285}}
                />

                <Autocomplete
                    id="tags-standard"
                    options={programmingLanguages}
                    multiple
                    defaultValue={[programmingLanguages[3]]}
                    filterSelectedOptions
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Multiple values"
                            placeholder="Favorites"
                        />
                    )}
                    sx={{width: 285}}
                />

                <Autocomplete
                    onKeyDown={(event) => {
                        if (event.key === 'Tab') {
                            if (inputHint.current) {
                                setInputValue(inputHint.current);
                                event.preventDefault();
                            }
                        }
                    }}
                    onClose={() => {
                        inputHint.current = '';
                    }}
                    onChange={(event, newValue) => {
                        setInputValue(newValue && newValue.label ? newValue.label : '');
                    }}
                    disablePortal
                    inputValue={inputValue}
                    id="combo-box-hint-demo"
                    options={programmingLanguages}
                    sx={{width: 285}}
                    renderInput={(params) => {
                        return (
                            <Box sx={{position: 'relative'}}>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        opacity: 0.5,
                                        left: 14,
                                        top: 16,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        width: 'calc(100% - 75px)',
                                    }}
                                >
                                    {inputHint.current}
                                </Typography>
                                <TextField
                                    {...params}
                                    onChange={(event) => {
                                        const newValue = event.target.value;
                                        setInputValue(newValue);
                                        const matchingOption = programmingLanguages.find((option) =>
                                            option.label.startsWith(newValue),
                                        );

                                        if (newValue && matchingOption) {
                                            inputHint.current = matchingOption.label;
                                        } else {
                                            inputHint.current = '';
                                        }
                                    }}
                                    label="Programming Language"
                                />
                            </Box>
                        );
                    }}
                />
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '0 0 20px'
            }}>
                <Autocomplete
                    id="search"
                    options={programmingLanguages.map((option) => option.label)}
                    freeSolo
                    renderInput={(params) => <TextField {...params} label="Search"/>}
                    sx={{width: 285}}
                />

                <Autocomplete
                    options={programmingLanguages}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                        <TextField {...params} label="Highlights"/>
                    )}
                    renderOption={(props, option, {inputValue}) => {
                        const {key, ...optionProps} = props;
                        const matches = match(option.label, inputValue, {insideWords: true});
                        const parts = parse(option.label, matches);

                        return (
                            <li key={key} {...optionProps}>
                                <div>
                                    {parts.map((part, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                fontWeight: part.highlight ? 700 : 400,
                                            }}
                                        >
                                                {part.text}
                                            </span>
                                    ))}
                                </div>
                            </li>
                        );
                    }}
                    sx={{width: 285}}
                />
            </div>
        </div>
    );
}

export default UIKitPageInputsModule;
