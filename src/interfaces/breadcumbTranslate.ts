interface IDictionary {
    [name: string]: string;
}

const dictionary: IDictionary = {
    'profile': 'Личный кабинет',
}

function translate(text = '') {
    return dictionary[text]

}

export default translate