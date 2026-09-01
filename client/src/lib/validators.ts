export const isValidUrl = (url: string): boolean =>{
        try {
            new URL(url);
            return true;
        } catch(err) {
            console.log(err)
            return false;
        }
    }