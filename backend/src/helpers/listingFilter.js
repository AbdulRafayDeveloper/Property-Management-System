
async function listingFilter(req,query={}) {

    // Build the filtering criteria
    const { address, targetBudget, leaseType, rentalType, propertyType, mustHaveAmenities } = req.query


    if (targetBudget) {
        filterCriteria.monthlyRent = { $lte: parseFloat(targetBudget) };
        logger.info(`Filtering by target budget: ${targetBudget}`);
    }

    if (leaseType) {
        filterCriteria.duration = leaseType;
        logger.info(`Filtering by lease type: ${leaseType}`);
    }

    if (rentalType) {
        filterCriteria.spaceType = { $in: rentalType.split(',') };
        logger.info(`Filtering by rental type: ${rentalType}`);
    }

    if (propertyType) {
        filterCriteria.propertyType = { $in: propertyType.split(',') };
        logger.info(`Filtering by property type: ${propertyType}`);
    }

    if (address) {
        filterCriteria.address = { $regex: new RegExp(address, 'i') };
        logger.info(`Filtering by address: ${address}`);
    }

    if (mustHaveAmenities) {
        const amenitiesFilters = JSON.parse(mustHaveAmenities);
        if (amenitiesFilters.inTheHome) {
            filterCriteria.amenities = { $all: amenitiesFilters.inTheHome };
            logger.info(`Filtering by inTheHome amenities: ${amenitiesFilters.inTheHome}`);
        }
        if (amenitiesFilters.onTheProperty) {
            if (filterCriteria.amenities) {
                filterCriteria.amenities.$all.push(...amenitiesFilters.onTheProperty);
            } else {
                filterCriteria.amenities = { $all: amenitiesFilters.onTheProperty };
            }
            logger.info(`Filtering by onTheProperty amenities: ${amenitiesFilters.onTheProperty}`);
        }
    }

    return query
    
}

module.exports = {listingFilter}