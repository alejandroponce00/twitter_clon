'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Heart, Repeat2 } from 'lucide-react'

interface Comment {
  id: number
  author: string
  content: string
  avatar: string
}

interface Tweet {
  id: number
  author: string
  username: string
  content: string
  avatar: string
  comments: Comment[]
  retweets: number
  likes: number
  liked: boolean
  retweeted: boolean
}

export default function TwitterClone() {
  const [tweets, setTweets] = useState<Tweet[]>([
    {
      id: 1,
      author: "John Doe",
      username: "johndoe",
      content: "¡Hola Twitter! Este es mi primer tweet.",
      avatar: "/placeholder.svg?height=40&width=40",
      comments: [
        {
          id: 1,
          author: "Jane Smith",
          content: "¡Bienvenido a Twitter!",
          avatar: "/placeholder.svg?height=30&width=30"
        }
      ],
      retweets: 0,
      likes: 0,
      liked: false,
      retweeted: false
    },
    {
      id: 2,
      author: "Jane Smith",
      username: "janesmith",
      content: "React y Next.js son geniales para crear aplicaciones web modernas.",
      avatar: "/placeholder.svg?height=40&width=40",
      comments: [],
      retweets: 1,
      likes: 5,
      liked: false,
      retweeted: false
    }
  ])
  const [newTweet, setNewTweet] = useState("")
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)
  const [currentTweetId, setCurrentTweetId] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")

  const handleNewTweet = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTweet.trim()) {
      const tweet: Tweet = {
        id: tweets.length + 1,
        author: "Usuario Actual",
        username: "usuario",
        content: newTweet,
        avatar: "/placeholder.svg?height=40&width=40",
        comments: [],
        retweets: 0,
        likes: 0,
        liked: false,
        retweeted: false
      }
      setTweets([tweet, ...tweets])
      setNewTweet("")
    }
  }

  const handleComment = (id: number) => {
    setCurrentTweetId(id)
    setCommentDialogOpen(true)
  }

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim() && currentTweetId) {
      setTweets(tweets.map(tweet => 
        tweet.id === currentTweetId 
          ? { ...tweet, comments: [...tweet.comments, { id: tweet.comments.length + 1, author: "Usuario Actual", content: newComment, avatar: "/placeholder.svg?height=30&width=30" }] } 
          : tweet
      ))
      setNewComment("")
    }
  }

  const handleRetweet = (id: number) => {
    setTweets(tweets.map(tweet => 
      tweet.id === id ? { ...tweet, retweets: tweet.retweeted ? tweet.retweets - 1 : tweet.retweets + 1, retweeted: !tweet.retweeted } : tweet
    ))
  }

  const handleLike = (id: number) => {
    setTweets(tweets.map(tweet => 
      tweet.id === id ? { ...tweet, likes: tweet.liked ? tweet.likes - 1 : tweet.likes + 1, liked: !tweet.liked } : tweet
    ))
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Twitter Clone</h1>
      
      <form onSubmit={handleNewTweet} className="mb-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
            placeholder="¿Qué está pasando?"
            className="flex-grow"
          />
          <Button type="submit">Tweet</Button>
        </div>
      </form>

      <div className="space-y-4">
        {tweets.map((tweet) => (
          <Card key={tweet.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={tweet.avatar} alt={tweet.author} />
                  <AvatarFallback>{tweet.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{tweet.author}</p>
                  <p className="text-sm text-gray-500">@{tweet.username}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{tweet.content}</p>
            </CardContent>
            <CardFooter>
              <div className="flex space-x-4 text-gray-500">
                <Dialog open={commentDialogOpen && currentTweetId === tweet.id} onOpenChange={(open) => {
                  setCommentDialogOpen(open)
                  if (!open) setCurrentTweetId(null)
                }}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => handleComment(tweet.id)}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {tweet.comments.length > 0 && tweet.comments.length}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Comentarios</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                        {tweet.comments.map((comment) => (
                          <div key={comment.id} className="mb-4 last:mb-0">
                            <div className="flex items-start space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={comment.avatar} />
                                <AvatarFallback>{comment.author[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-sm">{comment.author}</p>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                    </div>
                    <form onSubmit={submitComment} className="mt-4">
                      <Input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escribe tu comentario..."
                        className="mb-2"
                      />
                      <Button type="submit">Comentar</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRetweet(tweet.id)}
                  className={tweet.retweeted ? "text-green-500" : ""}
                >
                  <Repeat2 className="h-4 w-4 mr-2" />
                  {tweet.retweets > 0 && tweet.retweets}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleLike(tweet.id)}
                  className={tweet.liked ? "text-red-500" : ""}
                >
                  <Heart className="h-4 w-4 mr-2" fill={tweet.liked ? "currentColor" : "none"} />
                  {tweet.likes > 0 && tweet.likes}
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}