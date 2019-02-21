const questions = require('questions')

const platformQstns = {
    platformName: { info: 'Platform name (lowercase, underscores for spaces e.g. "iheart_radio")?' },
    platformDisplayName: { info: 'Platform display name (this will be user-facing, e.g. "iHeart Radio")?' },
    platformDdexPartyId: { info: 'Platform ddex id (e.g PADPIDA2011072101T)?' },
    platormDdexPartyName: { info: 'platform ddex party name (e.g "Amazon Digital Services")?' },
    platformDdexVersion: { info: 'platform ddex version (default: 3.8.1)?' },
    platformAcceptedFileTypes: { info: 'plaform accepted file types (default: [ "FLAC", "WAV" ])' },
}

const allQstsns = () => {
    questions.askMany(platformQstns, result => {
        commercialModelQstns(commercialModels => {
            result.plaformCommercialModel = commercialModels
            console.log(JSON.stringify(result));
        })
    })
}

allQstsns()

const commercialModelQstns = (cb, commercialModels=[]) => {
    commercialModels = [...commercialModels]
    const commercialModel = {
        commercialModel: { info: `platform commercial model (${commercialModels.length + 1})` },
        buildUsage: { info: 'build usage (comma-separated)' },
        AddOneMore: { info: 'Add another commercial model (Y-Yes, N-No)' }
    }

    questions.askMany(commercialModel, result => {
        commercialModels.push({commercialModel: result.commercialModel, buildUsage: result.buildUsage.trim().split(',')})
        const regex = new RegExp(/^Y$|^Yes$/i)
        if ((regex).test(result.AddOneMore)) {
            commercialModelQstns(cb, commercialModels)
        } else {
            cb(commercialModels)
            return
        }
    })
}


