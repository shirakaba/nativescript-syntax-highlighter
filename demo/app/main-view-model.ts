import { Observable, Page } from '@nativescript/core';

export class HelloWorldModel extends Observable {
    constructor() {
        super();
    }

    navigatingTo(args) {
        console.log('navigatingTo();');
        const page: Page = <Page>args.object;
        page.bindingContext = this;
    }

    code = "import SocketIO\n\nlet manager = SocketManager(socketURL: URL(string: \"http://localhost:8080\")!, config: [.log(true), .compress])\nlet socket = manager.defaultSocket\n\nsocket.on(clientEvent: .connect) {data, ack in\n    print(\"socket connected\")\n}\n\nsocket.on(\"currentAmount\") {data, ack in\n    guard let cur = data[0] as? Double else { return }\n    \n    socket.emitWithAck(\"canUpdate\", cur).timingOut(after: 0) {data in\n        socket.emit(\"update\", [\"amount\": cur + 2.50])\n    }\n\n    ack.with(\"Got your currentAmount\", \"dude\")\n}\n\nsocket.connect()"
}
