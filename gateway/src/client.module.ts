import { Global, Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: { port: 3003 },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class GlobalClientModule {}
