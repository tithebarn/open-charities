const getIdFilters = require('./id')
const getAreasFilters = require('./areas')
const getGrantsFilters = require('./grants')
const getCausesFilters = require('./causes')
const getBeneficiariesFilters = require('./beneficiaries')
const getOperationsFilters = require('./operations')
const getGeoFilters = require('./geo')
const getIncomeFilters = require('./income')
const getFinancesFilters = require('./finances')
const getRegistrationsFilters = require('./registrations')

const getElasticQuery = ({
  id,
  search,
  areas,
  grants,
  causes,
  beneficiaries,
  operations,
  geo,
  income,
  finances,
  registrations,
}) => {
  const must = search ? ({
    simple_query_string : {
      query: `${search.trim()}`, //`${search.trim().split(" ").join("~1 + ")}~1`, // what about "quoted searches"?
      fields: [
        "name^3",
        "alternativeNames^3",
        "activities",
        "contact.email",
        "trustees.names",
        "areasOfOperation.name",
        "causes.name",
        "beneficiaries.name",
        "operations.name",
        "grants.description",
        "grants.fundingOrganization.name",
      ],
    }
  }) : ({
    match_all: {}
  })

  const filter = [
    ...getIdFilters(id),
    ...getAreasFilters(areas),
    ...getGrantsFilters(grants),
    ...getCausesFilters(causes),
    ...getBeneficiariesFilters(beneficiaries),
    ...getOperationsFilters(operations),
    ...getGeoFilters(geo),
    ...getIncomeFilters(income),
    ...getFinancesFilters(finances),
    ...getRegistrationsFilters(registrations),
  ]

  return {
    bool: {
      must,
      filter,
    }
  }
}

module.exports = getElasticQuery
