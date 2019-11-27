import React from 'react';

const Documents = React.lazy(() => import('Modules/Docs'));
const DocumentEdit = React.lazy(() => import('Modules/Docs/containers/Edit'));
const DocumentView = React.lazy(() => import('Modules/Docs/containers/View'));

export default [
    {
        state: 'documents',
        path: '/docs',
        exact: true,
        name: 'Documents',
        component: Documents,
        resources: [
            {
                state: 'documents.edit',
                path: '/docs/edit/:docId',
                exact: true,
                name: 'Edit document',
                component: DocumentEdit
            },
            {
                state: 'documents.view',
                path: '/docs/:docId',
                exact: true,
                name: 'View document',
                component: DocumentView
            }
        ]
    }
];
