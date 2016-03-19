import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'


const userData = {
  '23': {
    id: '23',
    name: 'sloth',
    pictures: {
      32: './img/sloth32.jpg',
      64: './img/sloth64.jpg',
      128: './img/sloth128.jpg'
    }
  },
  '24': {
    id: '24',
    name: 'rabbit',
    pictures: {
      '32': './img/rabbit32.jpg',
      '64': './img/rabbit64.jpg',
      '128': './img/rabbit128.jpg',
    }
  },
  '25': {
    id: '25',
    name: 'bear',
    pictures: {
      '32': './img/bear32.jpg',
      '64': './img/bear64.jpg',
      '128': './img/bear128.jpg'
    }
  }
}

const getProfilePicture = function(user, size){
  return {
    uri: user.pictures[size],
    size: size
  }
}

const getUser = function(id){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(userData[id]);
    }, 500)
  })
}

const getAllUsers = function(){
  let users = []
  for(var key in userData){
    users.push(userData[key])
  }
  return {users}
}

const profilePicture = new GraphQLObjectType({
  name: 'profilePicture',
  description: 'Profile picture',
  fields: {
    uri: {
      type: GraphQLString,
      description: 'uri of picture'
    },
    size: {
      type: GraphQLInt,
      description: 'size of picture'
    }
  }
})


const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user.',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'The id of the user.'
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
  fields: {
    users: {
      type: new GraphQLList(userType)
    }
  }
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
  fields: {
    users: {
      type: usersType,
      resolve: () => getAllUsers()
    },
    user: {
      type: userType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: (root, {id}) => getUser(id)
    },
    board: {
      type: boardType,
      resolve: () => {return {id: '12312413', name: 'My public Pinterest board'}}
    }
  }
})


export const Schema = new GraphQLSchema({
  query: queryType
})


export default Schema
