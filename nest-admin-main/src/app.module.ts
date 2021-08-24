import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from './auth/auth.module';
import {CommonModule} from './common/common.module';
import {RoleModule} from './role/role.module';
import {PermissionModule} from './permission/permission.module';
import {ProductModule} from './product/product.module';
import {OrderModule} from './order/order.module';
import {APP_GUARD} from "@nestjs/core";
import {PermissionGuard} from "./permission/permission.guard";
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: parseInt(<string>process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DATABASE,
           autoLoadEntities: true,
          synchronize: true, // shouldn't be used in production - may lose data
        }),
        AuthModule,
        CommonModule,
        RoleModule,
        PermissionModule,
        ProductModule,
        OrderModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: PermissionGuard
        }
    ]
})
export class AppModule {
}
