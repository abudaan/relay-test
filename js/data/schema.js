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


class User {
  constructor(settings){
    ({
      userId: this.userId,
      name: this.name,
      pictures: this.pictures,
    } = settings)
  }
}

const userData = {
  23: {
    userId: 23,
    name: 'sloth',
    pictures: {
      32: './img/sloth32.jpg',
      64: './img/sloth64.jpg',
      128: './img/sloth128.jpg'
    }
  },
  24: {
    userId: 24,
    name: 'rabbit',
    pictures: {
      32: './img/rabbit32.jpg',
      64: './img/rabbit64.jpg',
      128: './img/rabbit128.jpg',
    }
  },
  25: {
    userId: 25,
    name: 'bear',
    pictures: {
      32: './img/bear32.jpg',
      64: './img/bear64.jpg',
      128: './img/bear128.jpg'
    }
  }
}

const getProfilePicture = function(user, size){
  return {
    uri: user.pictures[size],
    size
  }
}

const getUser = function(id){
  let user = new User(userData[id])

  return user

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(user)
  //   }, 2000)
  // })
}

const getAllUsers = function(){
  let users = []

  Object.entries(userData).forEach(entry => {
    users.push(new User(entry[1]))
  })
  // console.log(users)
  return {users}
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
  fields: () => ({
    userId: {
      type: GraphQLInt,
      description: 'The database id of the user'
    },
    name: {
      type: GraphQLString,
      description: 'The name of the user.'
    },
    profilePhoto: {
      type: profilePicture,
      description: 'The profile picture of the user',
      args: {
        size: {
          type: GraphQLInt
        }
      },
      resolve: (root, {size}) => getProfilePicture(root, size)
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
        userId: {
          type: GraphQLInt
        }
      },
      resolve: (root, {userId}) => getUser(userId)
    }
  })
})


export const Schema = new GraphQLSchema({
  query: queryType
})


export default Schema
