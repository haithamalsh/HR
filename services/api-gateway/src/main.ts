import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get, Req, Res, All } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as express from 'express';

@Controller()
class ProxyController {
  @All('/api/*')
  proxy(@Req() req: any, @Res() res: any) {
    // This method is never called because proxy middleware handles routes.
  }
}

@Module({
  controllers: [ProxyController],
})
class AppModule {}

async function bootstrap() {
  const server = express();

  // Mount proxy for assets
  server.use('/api/assets', createProxyMiddleware({ target: 'http://localhost:4001', changeOrigin: true, pathRewrite: { '^/api/assets': '/assets' } }));

  const app = await NestFactory.create(AppModule, new (await import('@nestjs/platform-express')).ExpressAdapter(server));
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  console.log('api-gateway (Nest) listening on', process.env.PORT || 3000);
}
bootstrap();
