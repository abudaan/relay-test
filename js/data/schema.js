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
class ProfilePicture {}

const userData = {
  23: {
    userId: '23', // don't use id because GraphQL needs to set an id, see below
    name: 'sloth',
    pictures: {
      32: './img/sloth32.jpg',
      64: './img/sloth64.jpg',
      128: './img/sloth128.jpg'
    }
  },
  24: {
    userId: '24',
    name: 'rabbit',
    pictures: {
      32: './img/rabbit32.jpg',
      64: './img/rabbit64.jpg',
      128: './img/rabbit128.jpg',
    }
  },
  25: {
    userId: '25',
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
    size: size
  }
}

const getUser = function(userId){
  let u = new User(userData[userId])
  console.log(userId, u)
  //console.log(u)
  return u

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(userData[id]);
  //   }, 2000)
  // })
}

const getAllUsers = function(){
  let users = []

  Object.entries(userData).forEach(entry => {
    //console.log(entry)
    users.push(new User(entry[1]))
  })
  // console.log(users)
  return {users}
}


var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id, userId} = fromGlobalId(globalId);
    //console.log(type, type === 'User')
    console.log(id, userId)
    if(type === 'User') {
      return getUser(id);
    }else if(type === 'Users') {
      return getAllUsers();
    }else if (type === 'ProfilePicure'){
      return getProfilePicture(id);
    }else{
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User){
      return userType;
    }else if(obj instanceof Users){
      return usersType;
    }else if(obj instanceof ProfilePicture){
      return profilePicture;
    }else{
      return null;
    }
  }
);


/*
const Node = new GraphQLInterfaceType({
  name: 'Node',
  description: 'A character in the Star Wars Trilogy',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the node.',
    }
  }),
  resolveType: node => {
    return getUser(node.id);
  }
})
*/


const profilePicture = new GraphQLObjectType({
  name: 'profilePicture',
  description: 'Profile picture',
  fields: () => ({
    id: globalIdField('ProfilePicture'),
    uri: {
      type: GraphQLString,
      description: 'uri of picture'
    },
    size: {
      type: GraphQLInt,
      description: 'size of picture'
    }
  }),
  interfaces: [nodeInterface]
})


const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user.',
  fields: () => ({
    //id: globalIdField('User'),
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
//      args: connectionArgs,
      args: {
        size: {
          type: GraphQLInt
        }
      },
      resolve: (root, {size}) => getProfilePicture(root, size)
    }
  })
//  interfaces: [nodeInterface]
})


var {connectionType: profilePictureConnection} = connectionDefinitions({
  name: 'ProfilePicure',
  nodeType: profilePicture
});


const usersType = new GraphQLObjectType({
  name: 'Users',
  description: 'List of all users.',
  fields: () => ({
    id: globalIdField('Users'),
    users: {
      type: new GraphQLList(userType)
    }
  }),
  interfaces: [nodeInterface]
})

const boardType = new GraphQLObjectType({
  name: 'Board',
  description: 'A public board of this Pinterest account',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
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
    },
    // board: {
    //   type: boardType,
    //   resolve: () => {
    //     return {
    //       id: '12312413',
    //       name: 'My public Pinterest board'}
    //   }
    // }
  })
})


export const Schema = new GraphQLSchema({
  query: queryType
})


export default Schema
