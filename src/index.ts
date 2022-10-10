// console.log("Node project test with TS...");

interface Observable {
  subscribe(o: Observer): void;
  unsubscribe(o: Observer): void;
  notify(): void;
}

interface Observer {
  update(): void;
}

class YoutubeChannel implements Observable {
  private channelSubscribers: Observer[] = [];
  private lastVideoPosted: string = "";

  subscribe(o: Observer): void {
    this.channelSubscribers.push(o);
  }

  unsubscribe(o: Observer): void {
    this.channelSubscribers = this.channelSubscribers.filter(
      (obs) => obs !== o
    );
  }

  notify(): void {
    this.channelSubscribers.forEach((obs) => obs.update());
  }

  addNewVideo(title: string): void {
    this.lastVideoPosted = title;
    this.notify();
    console.log("New youtube video added to channel");
  }

  // public getter.
  lastVideoTitle(): string {
    return this.lastVideoPosted;
  }
}

class Subscriber implements Observer {
  private observable: Observable | null = null;

  constructor(obs: Observable) {
    this.observable = obs;
  }

  update(): void {
    console.log("New video posted!!");

    // Es necesario «castear» Observable como su tipo concreto:
    // YoutubeChannel, para así poder acceder a su getter público.
    console.log((this.observable as YoutubeChannel).lastVideoTitle());
    console.log("**********************************");
  }
}

// Probamos el patrón:
const channel = new YoutubeChannel();
const s1 = new Subscriber(channel);
const s2 = new Subscriber(channel);

channel.subscribe(s1);
channel.subscribe(s2);
// channel.unsubscribe(s2);

channel.addNewVideo("Observer Pattern Video.");

/**
 * https://www.youtube.com/watch?v=HFkZb1g8faA
 * https://dev.to/rajat19/create-a-new-node-js-project-in-typescript-nao
 * https://khalilstemmler.com/blogs/typescript/node-starter-project/
 * https://dev.to/jochemstoel/bundle-your-node-app-to-a-single-executable-for-windows-linux-and-osx-2c89
 */
