module.exports = function(plop) {
  plop.setGenerator('Component', {
    description: 'two files',
    prompts: [{
      name: 'name',
      message: 'Component name:',
    }],
    actions: [
      {
        type: 'add',
        path: 'components/{{ properCase name }}/index.tsx',
        templateFile: 'plop-templates/functional-css.hbs',
      },
      {
        type: 'add',
        path: 'components/{{ properCase name }}/index.module.scss',
        templateFile: 'plop-templates/component-style.hbs',
      },
    ],
  })

  plop.setGenerator('Field', {
    description: 'formik field',
    prompts: [{
      name: 'name',
      message: 'Field name:',
    }],
    actions: [
      {
        type: 'add',
        path: 'components/fields/{{ properCase name }}Field/index.tsx',
        templateFile: 'plop-templates/field.hbs',
      },
      {
        type: 'add',
        path: 'components/fields/{{ properCase name }}Field/index.module.scss',
        templateFile: 'plop-templates/component-style.hbs',
      },
    ],
  })

  plop.setGenerator('Page', {
    description: 'create page',
    prompts: [{
      name: 'name',
      message: 'Page name:',
    }],
    actions: [
      {
        type: 'add',
        path: 'pages/{{dashCase name}}/index.tsx',
        templateFile: 'plop-templates/page.hbs',
      },
      {
        type: 'add',
        path: 'pages/{{dashCase name}}/index.module.scss',
        templateFile: 'plop-templates/component-style.hbs',
      },
    ],
  })

  plop.setGenerator('Jsx component', {
    description: 'include style jsx',
    prompts: [{
      name: 'name',
      message: 'Component name:',
    }],
    actions: [
      {
        type: 'add',
        path: 'components/{{name}}.tsx',
        templateFile: 'plop-templates/functional-index.hbs',
      },
    ],
  })

  plop.setGenerator('Context', {
    description: 'react context',
    prompts: [{
      name: 'name',
      message: 'Context name:',
    }],
    actions: [
      {
        type: 'add',
        path: 'context/{{snakeCase name}}_state.tsx',
        templateFile: 'plop-templates/context.hbs',
      },
    ],
  })

  plop.setGenerator('Svg', {
    description: 'svg component',
    prompts: [{
      name: 'name',
      message: 'Name ({Name}Svg):',
    }],
    actions: [
      {
        type: 'add',
        path: 'components/svg/{{ properCase name }}Svg.tsx',
        templateFile: 'plop-templates/svg.hbs',
      },
    ],
  })

  plop.setGenerator('Interface', {
    description: 'interface',
    prompts: [{
      name: 'name',
      message: 'Name (I{Name}):',
    }],
    actions: [
      {
        type: 'add',
        path: 'data/interfaces/I{{ properCase name }}.tsx',
        templateFile: 'plop-templates/interface.hbs',
      },
    ],
  })

  plop.setGenerator('Repository', {
    description: 'repository',
    prompts: [{
      name: 'name',
      message: 'Name ({Name}Repository):',
    }],
    actions: [
      {
        type: 'add',
        path: 'data/repositories/{{ properCase name }}Repository.tsx',
        templateFile: 'plop-templates/repository.hbs',
      },
    ],
  })
}
