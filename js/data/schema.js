import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';


// 'table' users
let usersTable = {
  23: {
    id: '23',
    name: 'sloth',
  },
  24: {
    id: '24',
    name: 'rabbit',
  },
  25: {
    id: '25',
    name: 'bear',
  }
}

// 'table' pictures
let picturesTable = {
  23: {
    32: './img/sloth32.jpg',
    64: './img/sloth64.jpg',
    128: './img/sloth128.jpg'
  },
  24: {
    32: './img/rabbit32.jpg',
    64: './img/rabbit64.jpg',
    128: './img/rabbit128.jpg'
  },
  25: {
    32: './img/bear32.jpg',
    64: './img/bear64.jpg',
    128: './img/bear128.jpg'
  },
}


const getAllUsers = function(){
  let users = []
  Object.entries(usersTable).forEach(entry => {
    users.push(entry[1])
  })
  return {users}
}


const getUser = function(userid, size){
  let user = usersTable[userid]
  user.profilePicture = picturesTable[userid][size]
  return user
}


const getProfilePicture = function(userid, size){
  return {
    uri: picturesTable[userid][size],
    size
  }
}


const profilePictureType = new GraphQLObjectType({
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
  description: 'A user',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'The database id of the user'
    },
    name: {
      type: GraphQLString,
      description: 'The name of the user'
    },
    profilePhoto: {
      type: profilePictureType,
      description: 'The profile picture of the user',
    }
  })
})


const usersType = new GraphQLObjectType({
  name: 'Users',
  description: 'List of all users.',
  fields: () => ({
    users: {
      type: new GraphQLList(userType)
    }
  })
})


const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: usersType,
      resolve: () => getAllUsers()
    },
    user: {
      type: userType,
      args: {
        id: {
          type: GraphQLString
        },
        size: {
          type: GraphQLInt
        }
      },
      resolve: (root, {id, size}) => getUser(id, size)
    },
    profilePicture: {
      type: profilePictureType,
      args: {
        userid: {
          type: GraphQLString
        },
        size: {
          type: GraphQLInt
        }
      },
      resolve: (root, {userid, size}) => getProfilePicture(userid, size)
    }
  })
})


export const Schema = new GraphQLSchema({
  query: queryType
})


export default Schema
