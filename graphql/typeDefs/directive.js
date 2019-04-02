const typeDefs = `
  directive @jwtAuth on QUERY | FIELD_DEFINITION
  directive @jwtScopes(scopes: [String] = []) on QUERY | FIELD_DEFINITION
  directive @apiKeyAuth(roles: [String] = []) on QUERY | FIELD_DEFINITION
  directive @deprecated(reason: String = "No longer supported") on FIELD_DEFINITION | INPUT_FIELD_DEFINITION
`

module.exports = typeDefs
