const getAllUserSchema = {
  schema: {
    summary: 'Get all users',
    description: 'Get all users',
    tags: ['User'],
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
          },
          required: ['id', 'name'],
        },
      },
    },
  },
};

export default getAllUserSchema;
