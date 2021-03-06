/**
* Store of all strings used in the app.
 *  @author Kjetil Fossheim
 */
// ES6 module syntax
export default class LangStrings {
  constructor() {
    this.language = 'no';
    this.strings = {
      en: {
        chosenTraitsHeader: 'Key properties',
        noTraitsSelected: 'No properties chosen',
        chosenTraits: 'Selected properties',
        noSpeciesLeft: 'No species found.',
        seeAllSpecies: 'View all',
        frontpageTitle: 'ArtsApp',
        frontpageTopDescription: 'You can download keys to your device and try out categorization of different species.',
        frontpageBottomDescription: 'Select keys in the list to read more about each key or to start categorization of species!',
        beta: 'Sneak Peek',
        keys: 'Keys',
        keysView: 'Discover',
        keyAbout: 'By choosing different traits in the key, the number of species will be limited and you will end up with one or a few species that align to your choices.',
        exit: 'Press once more for exiting the app.',
        noText: 'text is missing',
        noKeySelected: 'No key selected',
        selectKey: 'Select a key',
        language: 'Endre språk',
        introText: 'An easier way of species identification',
        no: 'Norsk',
        en: 'English',
        latin: 'Latin',
        helpGeneral: 'General',
        helpUse: 'Using the app',
        helpUpdate: 'Updating keys',
        langSelect: 'Select your language / \n  Velg ditt språk',
        langText: 'The content of each identification key is currently not translated. We are working on this. / \n  Innholdet i hver identifikasjonsnøkkel er for øyeblikket ikke oversatt til andre språk. Vi jobber med dette.',
        updateDIA: 'One or more keys might need updating. Do you want to look for updates?',
        accept: 'Yes',
        author: 'Author: ',
        ok: 'Ok',
        image: 'Images',
        search: 'Search',
        imageClickable: 'Click the image to see larger images',
        distribution: 'Distribution',
        newObs: 'Save Observation',
        nObs: 'Number of observations nearby: ',
        updateNearby: 'Updating list of nearby observations...',
        noElim: 'You have no eliminated species yet...',
        noPossible: 'There are no possible species left...',
        notAvailable: 'Not available',
        errParse: 'Could not download the key. Please close the application and try again later.',
        spInfo: 'Species Description',
        noSpInfo: 'No species description available',
        species: 'Species',
        speciesViewAll: 'Click the update icon to get latest observations.',
        coordinate: 'coordinates',
        date: 'Date',
        location: 'Location',
        noObservations: 'You don\'t have any observations registered.',
        myObs: 'My observations',
        newObsAddeed: 'New observation saved',
        enterLocation: 'Please enter place and county',
        place: 'Place',
        municipality: 'Municipality',
        county: 'County',
        cancel: 'Cancel',
        save: 'Save',
        eliminated: 'Eliminated',
        left: 'Possible remaining',
        leftNotGeo: 'Not found locally',
        leftGeo: 'Found locally',
        reset: 'Reset',
        about: 'About ArtsApp',
        keyInfo: 'About key',
        updateLocation: 'Update Location',
        updateEx: 'Select the keys you want to update the location for.',
        noLocation: 'Could not find Location. Make sure your device has location turned on.',
        noLocationHeader: 'Location is not available',
        noLocationDialog: 'Could not find your position. Do you still want to save the observation?',
        obsUpdateError: 'Could not get observations. Try again later.',
        latitude: 'Latitude',
        longitude: 'Longitude',
        selectedKeys: 'The following keys will be updated: ',
        withCoor: 'with the following coordinates:',
        curCoor: 'Get current coordinates',
        update: 'Update',
        needUpdate: 'Update available',
        goToUpdate: 'Go to the about section and press Look for Updates in the menu to look for updated keys. If a key does not work as expected after an update, go to the key info page to delete the key and download it again.',
        updateError: 'Something went wrong, try again',
        updateUnavailable: 'It is not possible to add location to the selected key.',
        updateUnavailableError: 'Something went wrong, try again. Or it is not possible to add location to the selected key.',
        updateZeroError: 'There is no observations for the selected key in your area.',
        noObsAvailable: 'No observations',
        noNetwork: 'No network connection available. Connect to a network and try again.',
        disNoNetwork: 'No internet connection available',
        noKey: 'You have not chosen any keys.',
        deleteObs: 'Do you want to delete this observation?',
        deleteObsTitle: 'Delete this observation?',
        onSpLesft: 'You have only one possible left',
        zeroSpLeft: 'There is zero possible left, try changing values or start over.',
        download: 'Download',
        useKey: 'Use key',
        debugMode: 'Enable debugMode',
        debugModeOn: 'DebugMode enabled',
        enableDebug: 'DebugMode enabled by pressing ',
        enableDebug2: ' more times',
        downloading: 'Downloading, this may take some time',
        downloaded: 'Download complete',
        downloadDialog: 'The key will now be downloaded. This should not take more than a minute.',
        downloadHeader: 'Additional information about the key must be downloaded before you can use it',
        betaKeys: 'Beta keys',
        firstNoNett: 'You need an active network connection to use the application for the first time. Please connect to a network and try again. \n\n Du er ikke tilkoblet noe nettverk. For å bruke ArtsApp, må du være tilkoblet internett første gang du bruker applikasjonen. Koble til internett og prøv på nytt.',
        firstStart: 'Starting the app for the first time. This might take some additional time...',
        tryAgain: 'Try again / Prøv igjen',
        noNetWorkTitle: 'No network /\n Ingen nettverk',
        updateKeySuccess: 'Selected keys updated.',
        updateKey: 'Update keys',
        manageKeys: 'Manage keys',
        lookForUpdate: 'Look for updates',
        lookingForUpdates: 'Looking for new updates...',
        updateSuccess: 'Update successful',
        updateFailed: 'No new keys available',
        noKeys: 'There are no updates available.',
        updateKeyText: 'Select the keys you want to update.',
        nationalDistribution: 'The map shows where in Norway it is expected that the species should be observed. Click on the map to see a larger image.',
        regionalDistribution: 'The map above shows the regional distribution of the species based on your current position.',
        regionalPosition: 'Allow the app to use your location to generate a local distribution map for the species.',
        noDistribution: 'There is no available distribution model for this species.',
        deleteKeyHeader: 'Delete key',
        deleteKey: 'Are you sure you want to delete the key from your device?\nYou can re-download the key later if you change your mind. ',
        delete: 'Delete',
        setCoordinates: 'Set location',
        saveCoordinates: "Set location for observation",
        longclick: 'Long Click on value for more info',
        goToSp: 'Go to species',
        level: 'Level: ',
        valueInfo: 'Value information',
        irelevant: 'Not applicable choices',
        noKeysDownloaded: 'There is no Keys downloaded. ',
        help: 'You need to download the key before it can be used. If you have limited storage space on your device, you will be able to delete the keys when you are finished using them. \n\n When the key is downloaded, you start species identification by clicking the key. Select different traits to limit the possible species. Possible species are visible in the bottom of the window. In the top of the window you will see your selected traits. \n\n When you have found the correct species, click on the species to go to the information page. On the species information page you can see pictures, read information and study distribution charts \n By clicking the save button in the top right corner, your observation is saved locally on your device. You can find an overview of all your saved observations in the My Observations menu. To delete or update an observation, do a long press on the observation in the list.',
        helpHeader: 'Help',
        noArtsLeft: 'No arts close',
        artsTotal: 'arts in total',
        artsPossible: 'possible arts of',
        possible: 'Possible',
        eliminated: 'Eliminated',
        nearby: 'Nearby',
      },
      no: {
        chosenTraitsHeader: 'Egenskaper ved nøkkel',
        noTraitsSelected: 'Du har ikke valgt noen egenskaper',
        chosenTraits: 'Valgte egenskaper',
        noSpeciesLeft: 'Ingen arter funnet med valgte egenskaper',
        seeAllSpecies: 'Vis alle',
        frontpageTitle: 'ArtsApp',
        frontpageTopDescription: 'Du kan laste ned nøklene til telefonen din og forsøke deg på kategorisering av forskjellige arter.',
        frontpageBottomDescription: 'Klikk på nøklene i listen for å lese mer om de enkelte nøklene eller for å begynne artsutvelgelse!',
        beta: 'Sneak peek',
        keys: 'Nøkler',
        keysView: 'Utforsk',
        keyAbout: 'Ved å velge ulike egenskaper i nøkkelen vil antallet arter snevres inn og man vil sitte igjen med en eller noen få arter som passer til dine valg. For sikker artsbestemmelse bør en god flora benyttes i tillegg.',
        exit: 'Trykk en gang til for å gå ut av applikasjonen',
        noText: 'manglende tekst',
        noKeySelected: 'Ingen nøkkel valgt',
        selectKey: 'Velg en nøkkel',
        language: 'Change language',
        introText: 'Enklere artsidentifikasjon',
        no: 'Norsk',
        en: 'English',
        latin: 'Latin',
        helpGeneral: 'Generelt',
        helpUse: 'Bruke appen',
        helpUpdate: 'Oppdatere nøkler',
        langSelect: 'Select your language / \n  Velg ditt språk',
        langText: 'The content of each identification key is currently not translated. We are working on this. / \n  Innholdet i hver identifikasjonsnøkkel er for øyeblikket ikke oversatt til andre språk. Vi jobber med dette.',
        updateDIA: 'En eller flere nøkler kan være utdatert. Vil du se etter oppdateringer nå?',
        updateSuccess: 'Oppdatering vellykket',
        updateFailed: 'Ingen nye nøkler tilgjengelig',
        accept: 'Ja',
        author: 'Forfatter: ',
        ok: 'Ok',
        image: 'Bilder',
        search: 'Søk',
        imageClickable: 'Klikk på bildet for å se større bilder',
        distribution: 'Utbredelse',
        newObs: 'Lagre observasjon',
        nObs: 'Antall observasjoner i nærheten: ',
        updateNearby: 'Oppdaterer liste over nærliggende observasjoner...',
        noElim: 'Du har ingen eliminerte arter ennå...',
        noPossible: 'Det er ingen mulige arter igjen...',
        notAvailable: 'Ikke tilgjengelig',
        errParse: 'Kunne ikke laste ned nøkkelen akkurat nå. Vennligst lukk appen og prøv igjen senere.',
        spInfo: 'Artsbeskrivelse',
        noSpInfo: 'Ingen artsbeskrivelse tilgjengelig',
        species: 'Art',
        speciesViewAll: 'Klikk på oppdateringssymbolet for å hente siste observasjoner.',
        date: 'Dato',
        coordinate: 'Koordinater',
        location: 'Lokasjon',
        noObservations: 'Du har ingen lagrede observasjoner',
        myObs: 'Mine observasjoner',
        newObsAddeed: 'Ny observasjon lagret',
        enterLocation: 'Vennligst oppgi sted og fylke',
        place: 'Stedsnavn',
        municipality: 'Kommune',
        county: 'Fylke',
        cancel: 'Avbryt',
        save: 'Lagre',
        eliminated: 'Eliminerte',
        left: 'Mulige gjenværende',
        leftNotGeo: 'Ikke funnet i nærheten',
        leftGeo: 'Funnet i nærheten',
        reset: 'Nullstill',
        about: 'Om ArtsApp',
        keyInfo: 'Om nøkkelen',
        updateLocation: 'Oppdater lokasjon',
        updateEx: 'Velg de nøklene du vil oppdatere lokasjonen til',
        noLocation: 'Kunne ikke finne plassering. Sørg for at enheten din har posisjon slått på.',
        noLocationHeader: 'Ingen posisjon tilgjengelig',
        noLocationDialog: 'Kunne ikke finne plassering. Vil du lagre observasjonen uansett?',
        obsUpdateError: 'Kan ikke hente observasjoner. Prøv igjen senere.',
        updateUnavailable: 'Det er ikke mulig å legge til lokasjon for valgt nøkkel',
        updateUnavailableError: 'Noe gikk galt, prøv igjen. Eller det er ikke mulig å legge til lokasjon for valgt nøkkel',
        updateZeroError: 'Det er ingen observasjoner for den valgte nøkkelen i ditt område.',
        noObsAvailable: 'Ingen observasjoner',
        latitude: 'Breddegrad',
        longitude: 'Lengdegrad',
        selectedKeys: 'Følgende nøkler vil bli oppdatert: ',
        withCoor: 'med påfølgende koordinater: ',
        curCoor: 'Hent nåværende koordinater',
        updateError: 'Noe gikk galt, prøv igjen.',
        noNetwork: 'Ingen nettverkstilkobling tilgjengelig. Koble til et nettverk og prøv igjen.',
        disNoNetwork: 'Ingen nettverkstilkobling tilgjengelig',
        update: 'Oppdater',
        needUpdate: 'Oppdatering tilgjengelig',
        goToUpdate: 'Gå til Om ArtsApp og klikk på Se etter oppdateringer i menyen for å se etter oppdaterte nøkkelversjoner. Dersom en nøkkel ikke fungerer som forventet etter en oppdatering, gå til nøkkelens info-side for å slette nøkkelen og deretter laste den ned på nytt.',
        noKey: 'Du har ikke valgt noen nøkler.',
        deleteObs: 'Vil du slette denne observasjonen?',
        deleteObsTitle: 'Slette observasjonen?',
        setCoordinates: 'Sett plassering',
        saveCoordinates: "Sett plassering for observasjonen",
        onSpLesft: 'Det er bare en mulig igjen.',
        zeroSpLeft: 'Det er ingen mulig igjen, prøv å endre verdier eller start på nytt.',
        download: 'Last ned',
        useKey: 'Bruk nøkkel',
        debugMode: 'Aktiver debugMode',
        debugModeOn: 'DebugMode aktivert',
        enableDebug: 'DebugMode slåes på ved å trykke ',
        enableDebug2: ' ganger til.',
        downloading: 'Laster ned nøkkelen. Dette kan ta litt tid...',
        downloaded: 'Nedlasting fullført',
        downloadDialog: 'Nøkkelen vil nå bli lastet ned. Dette burde ikke ta mer enn et minutt.',
        downloadHeader: 'Du må laste ned nøkkelen før du kan begynne å bruke den',
        betaKeys: 'Beta nøkler',
        firstNoNett: 'You need an active network connection to use the application for the first time. Please connect to a network and try again. \n\n Du er ikke tilkoblet noe nettverk. For å bruke ArtsApp, må du være tilkoblet internett første gang du bruker applikasjonen. Koble til internett og prøv på nytt.',
        firstStart: 'Starter applikasjonen for første gang. Dette kan ta noe ekstra tid...',
        tryAgain: 'Try again / Prøv igjen',
        noNetWorkTitle: 'No network /\n Ingen nettverk',
        updateKeySuccess: 'Valgte nøkler er oppdatert.',
        updateKey: 'Oppdater nøkler',
        manageKeys: 'Administrer nøkler',
        lookForUpdate: 'Se etter oppdateringer',
        lookingForUpdates: 'Ser etter nye oppdateringer...',
        noKeys: 'Det er ingen tilgjengelig oppdateringer.',
        updateKeyText: 'Velg de nøklene du vil oppdatere.',
        nationalDistribution: 'Kartet over viser hvor i Norge det er forventet at arten skal kunne observeres. Klikk på kartet for å se et større bilde.',
        regionalDistribution: 'Kartet over bruker viser den regionale distribusjonen til arten basert på din nåværende posisjon.',
        regionalPosition: 'Tillat at appen bruker posisjonen din for å generere et regionalt distribusjonskart for arten.',
        noDistribution: 'Det er ingen utbredelsesmodel tilgjengelig for denne arten.',
        deleteKeyHeader: 'Slett nøkkel',
        deleteKey: 'Er du sikke på at du vil slette nøkkelen fra enheten din?\nNøkkelen vil kunne lastes ned på nytt senere.',
        delete: 'Slett',
        longclick: 'Klikk og hold på verdi for mer informasjon',
        goToSp: 'Gå til art',
        level: 'Nivå: ',
        valueInfo: 'Verdi informasjon',
        irelevant: 'Ikke aktuelle valg',
        noKeysDownloaded: 'Det er ingen nøkler nedlastet.',
        help: 'Før nøkkelen kan brukes for første gang må du laste ned nøkkelen. Nøkkelen kan slettes ved en senere anledning dersom du har lite lagringsplass på enheten din. \n\n Når nøkkelen er lastet ned begynner du artsutvelgelse ved å klikke på nøkkelen. Velg blant de forskjellige karakterene for å snevre inn utvalget. Du vil til enhver tid se aktuelle arter nederst i vinduet. Øverst i vinduet vil du se hvilke karakterer du har valgt. \n\n Når du har funnet korrekt art, klikker du på arten for å gå videre. På artssiden vil du kunne se bilder og lese informasjon om arten, samt studere utbredelseskartene. \n\n Ved å klikke på lagre-knappen øverst til høyre blir observasjonen lagret. Du kan finne igjen observasjonen din i menyvalget Mine Observasjoner. Du kan slette eller oppdatere lagrede observasjoner ved å holde på den aktuelle observasjonen i listen.',
        helpHeader: 'Hjelp',
        noArtsLeft: 'Ingen i nærheten',
        artsTotal: 'arter totalt',
        artsPossible: 'mulige arter igjen av',
        possible: 'Mulige',
        eliminated: 'Eliminerte',
        nearby: 'I Nærheten',
      }
    };
  }

  /**
   * get strings in set language
   * @param {String} stringName name of string to be returned
   * @return {String}
   */
  getString(stringName) {
    lang = 'en';
    if (typeof this.strings[this.language] !== 'undefined') {
      return this.strings[this.language][stringName];
    }
    return this.strings.en[stringName];
  }

  /**
   * get strings in both languages
   * @param {String} stringName name of string to be returned
   * @return {String}
   */
  getComboString(stringName, newLine) {
    if (typeof newLine !== 'undefined') {
      return this.strings.en[stringName] + ' / \n ' + this.strings.no[stringName];
    }
    return this.strings.en[stringName] + ' / ' + this.strings.no[stringName];
  }

  /**
   * get all strings in set language
   * @param {String} lang set language
   * @return {Object} Object of strings in language 'lang'.
   */
  getLangStrings(lang) {
    if (typeof lang === 'undefined') {
      return this.strings.no;
    }
    return this.strings[lang];
  }
}
