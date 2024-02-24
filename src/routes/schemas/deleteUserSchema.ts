const deleteUserSchema = {
  schema: {
    summary: 'Delete user',
    description: 'Delete a user from the database',
    tags: ['User'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
      required: ['id'],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      500: {
        description: 'Failed response',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
  },
};

export default deleteUserSchema;
