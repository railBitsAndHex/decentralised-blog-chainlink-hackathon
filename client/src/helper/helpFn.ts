export const accShorten = (inputStr: string) : string => {
    return inputStr.substring(0,4).concat("....").concat(inputStr.substring(inputStr.length-4, inputStr.length))
}