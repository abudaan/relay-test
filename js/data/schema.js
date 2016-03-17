import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'


const abdaanPicture = {
  uri: 'taart.jpg',
  size: 32
}

const abudaan = {
  id: 23,
  name: 'abudaan',
  profilePicture: {
    uri: 'taart.jpg',
    size: 32
  }
}

const userData = {
  23: abudaan
}

const getProfilePicture = function(size){
  return abudaanPicture
}

const getUser = function(id){
  return abudaan
}

const profilePicture = new GraphQLObjectType({
  name: 'profilePicture',
  description: 'Profile picture',
  fields: () => ({
    uri: {
      type: GraphQLString,
      description: 'uri of picture'
    },
    size: {
      type: GraphQLInt,
      description: 'size of picture'
    }
  })
})


const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user.',
  fields: {
    id: {
      type: GraphQLInt,
      description: 'The id of the user.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the user.',
    },
    profilePhoto: {
      type: profilePicture,
      description: 'The profile picture of the user',
      args: {
        size: {
          type: GraphQLInt
        }
      },
      resolve: (root, {size}) => getProfilePicture
    },
    // profilePicture: {
    //   type: profilePicture,
    //   description: 'The profile picture of the user',
    //   resolve: () => getProfilePicture(user),
    // },
  },
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: userType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (root, {id}) => getUser(id)
    }
  })
})


export const Schema = new GraphQLSchema({
  query: queryType
})


export default Schema
