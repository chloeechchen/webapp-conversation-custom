import type { FC } from 'react'
import React from 'react'

import Main from '@/app/components'

const App: FC = ({
  params,
}: any) => {
  console.log('params', params);

  return (
    <Main appId={params.app} />
  )
}

export default React.memo(App)
