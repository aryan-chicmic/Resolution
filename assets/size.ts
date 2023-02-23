import { _decorator, Component, Node, UITransform, Enum } from "cc";
const { ccclass, property } = _decorator;

export enum CROPDECIDER {
  NONE,
  CROP,
  NONCROP,
}
// Enum(CROPDECIDER);
@ccclass("size")
export class size extends Component {
  @property({ type: Enum(CROPDECIDER) })
  cropdcide: CROPDECIDER = CROPDECIDER.NONE;

  @property({ type: Node })
  rect1: Node = null;
  @property({ type: Node })
  rect2: Node = null;
  @property(Node)
  get frame(): Node {
    return this.rect2;
  }
  set frame(value: Node) {
    this.rect2 = value;
    this.wihoutCrop();
  }

  setFrameSize() {
    console.log("Okey we are her ");
  }
  start() {
    // switch(this.cropdcide){
    //   case CROPDECIDER
    // }
  }
  wihoutCrop() {
    switch (this.cropdcide) {
      case CROPDECIDER.NONE: {
        console.log("Node");
        break;
      }
      case CROPDECIDER.CROP: {
        console.log("crop");
        break;
      }
    }
    var rec1_width = this.rect1.getComponent(UITransform).width;
    var rect1_height = this.rect1.getComponent(UITransform).height;
    console.log("aspect ratio of rect1", rec1_width / rect1_height);

    var rect2_width = this.rect2.getComponent(UITransform).width;
    var rect2_height = this.rect2.getComponent(UITransform).height;
    console.log("aspect ratio of rect2", rect2_width / rect2_height);
    var scaleofRect = this.rect2.getScale();
    if (rect2_height > rect2_width) {
      var aspectRatio = rect1_height / rect2_height;
      this.rect2.setScale(aspectRatio, aspectRatio);
      var newH = this.rect2.getComponent(UITransform).getBoundingBox().height;
      var newW = this.rect2.getComponent(UITransform).getBoundingBox().width;
      console.log("aspect ratio of after rect2", newW / newH);
    } else if (rect2_height < rect2_width) {
      var aspect = rec1_width / rect2_width;
      this.rect2.setScale(aspect, aspect);
      var newH = this.rect2.getComponent(UITransform).getBoundingBox().height;
      var newW = this.rect2.getComponent(UITransform).getBoundingBox().width;
      console.log("aspect ratio of after rect2", newW / newH);
    } else {
      var aspectratio = rect1_height / rect2_height;
      this.rect2.setScale(aspectratio, aspectratio);
      var newH = this.rect2.getComponent(UITransform).getBoundingBox().height;
      var newW = this.rect2.getComponent(UITransform).getBoundingBox().width;
      console.log("aspect ratio of after rect2", newW / newH);
    }
  }

  withCrop() {
    var rec1_width = this.rect1.getComponent(UITransform).width;
    var rect1_height = this.rect1.getComponent(UITransform).height;
    var aspectR1 = rec1_width / rect1_height;
    console.log("aspect ratio of rect1", aspectR1);

    var rect2_width = this.rect2.getComponent(UITransform).width;
    var rect2_height = this.rect2.getComponent(UITransform).height;
    var aspectR2 = rect2_width / rect2_height;
    console.log("aspect ratio of rect2", aspectR2);
    if (aspectR1 > aspectR2) {
      var decider = rec1_width / rect2_width;
      this.rect2.setScale(
        this.rect2.getScale().x * decider,
        this.rect2.getScale().y * decider
      );
    } else {
      var decider = rect1_height / rect2_height;
      this.rect2.setScale(
        this.rect2.getScale().x * decider,
        this.rect2.getScale().y * decider
      );
    }
  }

  update(deltaTime: number) {}
}
