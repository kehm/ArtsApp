import AsyncStorage from '@react-native-community/async-storage';

/**
 * Handler class for managing AsyncStorage
 * 
 * @author kehm
 */
class AsyncStorageHandler {
    
    // Items in store
    LANGUAGE = 'LANGUAGE';
    LASTDOWNLOAD = 'LAST_DOWNLOAD';

    /**
     * Get language string
     * @return {String} language stored
     */
    getLanguage = async () => {
        return await AsyncStorage.getItem(this.LANGUAGE);
    }

    /**
     * Get last download timestamp
     * 
     * @return {String} Last download timestamp
     */
    getLastDownload = async () => {
        return await AsyncStorage.getItem(this.LASTDOWNLOAD);
    }

    /**
     * Set language string
     * 
     * @param {String} lang Language string
     */
    setLanguage = async (lang) => {
        try {
            await AsyncStorage.setItem(this.LANGUAGE, lang);
            return lang;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Set timestamp for last download/app update
     * 
     * @param {String} date Last download date
     */
    setLastDownload = async (date) => {
        try {
            await AsyncStorage.setItem(this.LASTDOWNLOAD, date);
            return date;
        } catch (err) {
            console.log(err);
        }
    }
}

export default AsyncStorageHandler;
