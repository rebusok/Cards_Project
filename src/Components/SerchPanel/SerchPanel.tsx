import React, {FC} from 'react';
import SuperInputText from '../c1-SuperInputText/SuperInputText';

interface Props {
    onSearch: (value:string) => void
    placeholderInput: string
    classNameInput: string
    value:string | ''
}



const SearchPanel:FC<Props> = ({onSearch, placeholderInput,value,  classNameInput}) => {


    return (
        <>
            <SuperInputText
                value={value}
                onChangeText={onSearch}
                placeholder={placeholderInput}
                className={classNameInput}
            />
        </>
    );
};

export default SearchPanel;