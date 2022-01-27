import { Ball, Paddle } from "../entities";
import { Entity } from "../entities/entity";
import { FieldDimensions } from "../render";

export class Controller {
      private readonly paddleWidth = 30;
      private readonly paddleHeight = 160;
      private readonly ballRadius = 20;
      private readonly paddleClearance = 40;

      private readonly paddleVelocity = .5;
      private readonly ballVelocity = 1.04 * .5;

      private readonly entities = new Map<string, Entity>();
      private readonly borders: {
            top: number,
            bottom: number,
            left: number,
            right: number
      };
      private readonly score = {
            player: 0,
            cpu: 0
      };

      constructor(fieldDimensions: FieldDimensions) {
            const leftPaddle = new Paddle({
                        x: this.paddleClearance,
                        w: this.paddleWidth,
                        h: this.paddleHeight
                  }),
                  ball = new Ball({ r: this.ballRadius }),
                  rightPaddle = new Paddle({
                        x: fieldDimensions.w - this.paddleWidth - this.paddleClearance,
                        w: this.paddleWidth,
                        h: this.paddleHeight
                  });

            this.entities.set('leftPaddle', leftPaddle)
                         .set('ball', ball)
                         .set('rightPaddle', rightPaddle);

            this.borders = {
                  top: 0,
                  bottom: fieldDimensions.h,
                  left: 0,
                  right: fieldDimensions.w
            };

            this.setUpPlayerControls();
            this.resetEntities();
      };

      getEntities(): Entity[] {
            return [...this.entities.values()];
      };

      update(dt: number): void {
            this.entities.forEach(entity => entity.move(dt));

            const ball = this.entities.get('ball') as Ball,
                  leftPaddle = this.entities.get('leftPaddle') as Paddle,
                  rightPaddle = this.entities.get('rightPaddle') as Paddle;

            if(!ball.launched) ball.yCenter = leftPaddle.yCenter;

            this.processCollisions(leftPaddle, rightPaddle, ball);

            this.processAiLogic(rightPaddle, ball);
      };

      private processCollisions(leftPaddle: Paddle, rightPaddle: Paddle, ball: Ball): void {
            [leftPaddle, rightPaddle].forEach(pad => {
                  if(pad.top <= this.borders.top) {
                        pad.yVelocity = 0;
                        pad.top = this.borders.top;
                  }

                  if(pad.bottom >= this.borders.bottom) {
                        pad.yVelocity = 0;
                        pad.bottom = this.borders.bottom;
                  }
            });

            if(ball.launched) {
                  if(ball.top <= this.borders.top) {
                        ball.top = this.borders.top;
                        ball.yVelocity *= -1;
                  }

                  if(ball.bottom >= this.borders.bottom) {
                        ball.bottom = this.borders.bottom;
                        ball.yVelocity *= -1;
                  }

                  if(ball.yCenter <= leftPaddle.bottom && ball.yCenter >= leftPaddle.top && ball.left <= leftPaddle.right) {
                        ball.left = leftPaddle.right;
                        ball.xVelocity *= -1;
                  }

                  if(ball.yCenter <= rightPaddle.bottom && ball.yCenter >= rightPaddle.top && ball.right >= rightPaddle.left) {
                        ball.right = rightPaddle.left;
                        ball.xVelocity *= -1;
                  }

                  if(ball.right >= rightPaddle.right) {
                        this.score.player++;
                        document.title = `Player ${this.score.player} : ${this.score.cpu} CPU`;
                        this.resetEntities();
                  }

                  if(ball.left <= leftPaddle.left) {
                        this.score.cpu++;
                        document.title = `Player ${this.score.player} : ${this.score.cpu} CPU`;
                        this.resetEntities();
                  }
            }
      };

      private processAiLogic(paddle: Paddle, ball: Ball): void {
            const marginCoefficient = .15,
                  ballAbove = ball.yCenter < paddle.top + marginCoefficient * paddle.height,
                  ballBelow = ball.yCenter > paddle.bottom - marginCoefficient * paddle.height,
                  ballAgainst = !ballAbove && !ballBelow,
                  ballMovingTowards = ball.xVelocity > 0;

            const fieldCenter = (this.borders.bottom - this.borders.top) / 2,
                  fieldCenterAbove = fieldCenter < paddle.yCenter,
                  fieldCenterBelow = fieldCenter > paddle.yCenter,
                  fieldCenterProximity = Math.abs(fieldCenter - paddle.yCenter),
                  fieldCenterProximityMargin = 10;

            if(ballMovingTowards) {
                  if(!ballAgainst) {
                        if(ballAbove) paddle.yVelocity = -this.paddleVelocity;
                        if(ballBelow) paddle.yVelocity = this.paddleVelocity;
                  } else {
                        paddle.yVelocity = 0;
                  }
            } else {
                  if(fieldCenterProximity <= fieldCenterProximityMargin) paddle.yCenter = fieldCenter;

                  if(fieldCenterAbove) {
                        paddle.yVelocity = -this.paddleVelocity;
                  } else if(fieldCenterBelow) {
                        paddle.yVelocity = this.paddleVelocity;
                  } else {
                        paddle.yVelocity = 0;
                  }
            }
      };

      private resetEntities(): void {
            const ball = this.entities.get('ball') as Ball,
                  leftPaddle = this.entities.get('leftPaddle') as Paddle,
                  rightPaddle = this.entities.get('rightPaddle') as Paddle;
            
            ball.launched = false;
            ball.yCenter = leftPaddle.yCenter;
            ball.left = leftPaddle.right;

            const fieldYCenter = (this.borders.bottom - this.borders.top) / 2;
            leftPaddle.yCenter = fieldYCenter;
            rightPaddle.yCenter = fieldYCenter;

            leftPaddle.xVelocity = rightPaddle.xVelocity = 0;
            leftPaddle.yVelocity = rightPaddle.yVelocity = 0;
      };

      private setUpPlayerControls(): void {
            const paddle = this.entities.get('leftPaddle') as Paddle,
                  ball = this.entities.get('ball') as Ball;

            window.addEventListener('keydown', e => {
                  switch(e.key) {
                        case 'ArrowUp': {
                              paddle.yVelocity = -this.paddleVelocity;
                              break;
                        };
                        case 'ArrowDown': {
                              paddle.yVelocity = this.paddleVelocity;
                              break;
                        };
                        case ' ': {
                              if(!ball.launched) {
                                    ball.launched = true;
                                    ball.xVelocity = this.ballVelocity;
                                    ball.yVelocity = -this.ballVelocity;
                              }
                        }
                  }
            });

            window.addEventListener('keyup', e => {
                  if(e.key !== ' ') paddle.yVelocity = 0;
            });
      };
};